const express = require("express");
const cors = require("cors");
const newsRouter = require("./routes/news");

const app = express();
app.use(cors());
app.use("/news", newsRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
