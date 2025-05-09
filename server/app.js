// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const newsRouter = require("./routes/news");
// const { router: stocksRouter, setPrice } = require("./routes/stocks");
// const { connectToFinnhub, subscribeSymbols } = require("./ws/stockSocket");


// const app = express();
// app.use(cors());

// // Routes
// app.use("/news", newsRouter);
// app.use("/stocks", stocksRouter);

// const PORT = process.env.PORT || 10000;

// // Start Finnhub WebSocket and stream to frontend
// connectToFinnhub((rawMessage) => {
//   const data = JSON.parse(rawMessage);
//   if (data.type === "trade") {
//     for (const trade of data.data) {
//       const symbol = trade.s;
//       const price = trade.p;
//       const time = trade.t;
//       setPrice(symbol, price, time); // save it for HTTP GET
//     }
//   }
// });

// // Subscribe to stock symbols here
// subscribeSymbols(["AAPL", "MSFT", "GOOGL"]);

// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });




// server/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const newsRoute = require("./routes/news");
const stocksRouter = require('./routes/stocks');
const cryptoRouter = require('./routes/crypto');
const forexRouter = require('./routes/forex');
const commoditiesRouter = require('./routes/commodities');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/news", newsRoute);
app.use('/stocks', stocksRouter);
app.use('/crypto', cryptoRouter);
app.use('/forex', forexRouter);
app.use('/commodities', commoditiesRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
