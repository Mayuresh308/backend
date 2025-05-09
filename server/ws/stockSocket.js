const WebSocket = require("ws");

let finnhubSocket = null;
let pendingSymbols = [];

function connectToFinnhub(onMessageCallback) {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  if (!FINNHUB_API_KEY) {
    console.error("Missing FINNHUB_API_KEY in .env");
    return;
  }

  const URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;
  finnhubSocket = new WebSocket(URL);

  finnhubSocket.on("open", () => {
    console.log("Connected to Finnhub WebSocket");

    // Subscribe to any pending symbols
    if (pendingSymbols.length > 0) {
      console.log(`Subscribing to pending symbols: ${pendingSymbols.join(", ")}`);
      for (const symbol of pendingSymbols) {
        finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol }));
      }
      pendingSymbols = [];
    }
  });

  finnhubSocket.on("message", (data) => {
    onMessageCallback(data);
  });

  finnhubSocket.on("close", () => {
    console.warn("Finnhub socket closed. Reconnecting in 5s...");
    setTimeout(() => connectToFinnhub(onMessageCallback), 5000);
  });

  finnhubSocket.on("error", (err) => {
    console.error("Finnhub WebSocket error:", err.message);
  });
}

function subscribeSymbols(symbols) {
  if (finnhubSocket && finnhubSocket.readyState === WebSocket.OPEN) {
    console.log(`Subscribing to symbols: ${symbols.join(", ")}`);
    for (const symbol of symbols) {
      finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol }));
    }
  } else {
    console.warn("Finnhub socket not ready. Queueing symbols for later...");
    pendingSymbols.push(...symbols);
  }
}

module.exports = {
  connectToFinnhub,
  subscribeSymbols,
};
