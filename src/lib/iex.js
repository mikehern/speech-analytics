const fetch = require('node-fetch');
const promise = require('bluebird');
const client = require('iex-api');

const iex = new client.IEXClient(fetch);

const initPortfolio = ['fb', 'aapl', 'nflx', 'goog'];

const getStockQuote = async (stock) => {
  try {
    const data = await iex.stockQuote(stock);
    const { latestPrice, change, companyName, symbol } = data;
    return {
      price: latestPrice,
      change: change,
      name: companyName,
      symbol
    }  
  } catch (error) {
    console.error(error);
  }
}

const getInitPortfolio = async (portfolio = initPortfolio) => {
  try {
    const summaryData = await promise.map(portfolio, (stock) => {
      const data = getStockQuote(stock);
      return data;
    });
    
    return summaryData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getInitPortfolio
}