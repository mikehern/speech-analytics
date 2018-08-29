const express = require('express');
const os = require('os');
const stocks = require('../lib/iex');
const app = express();

app.use(express.static('dist'));


app.get('/api/portfolio', async (req, res) => {
  const results = await stocks.getInitPortfolio();
  res.send({ portfolio: results });
});

app.get('/api/stocktimeseries/:symbol/:range', async (req, res) => {
  const { symbol, range } = req.params;
  const results = await stocks.getStockTimeSeries(symbol, range);
  res.send({ stock: results });
})


const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
