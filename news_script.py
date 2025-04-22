
import requests
from bs4 import BeautifulSoup
import json
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon', quiet=True)
sia = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    score = sia.polarity_scores(text)['compound']
    if score > 0.1:
        return 'Positive'
    elif score < -0.1:
        return 'Negative'
    else:
        return 'Neutral'

def get_yahoo_finance_news():
    url = 'https://finance.yahoo.com/news/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (compatible; StockBot/1.0)'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        news_items = soup.find_all('section', attrs={'data-testid': 'storyitem'}, limit=10)

        news_data = []

        for item in news_items:
            title_tag = item.find('h3')
            title = title_tag.get_text(strip=True) if title_tag else 'No Title'

            link_tag = item.find('a', href=True)
            link = link_tag['href'] if link_tag else ''
            if link and not link.startswith('http'):
                link = 'https://finance.yahoo.com' + link

            summary_tag = item.find('p')
            summary = summary_tag.get_text(strip=True) if summary_tag else ''

            image_tag = item.find('img')
            image = image_tag['src'] if image_tag else ''

            publisher_tag = item.find('div', class_='publishing')
            publisher = publisher_tag.get_text(strip=True) if publisher_tag else 'Unknown'

            sentiment = analyze_sentiment(f"{title} {summary}")

            news_data.append({
                'title': title,
                'link': link,
                'summary': summary,
                'image': image,
                'publisher': publisher,
                'sentiment': sentiment
            })

        return news_data

    except Exception as e:
        return [{'error': str(e)}]

if __name__ == "__main__":
    print(json.dumps(get_yahoo_finance_news()))
