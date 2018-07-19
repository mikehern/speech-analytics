const fetch = require('node-fetch');
const promise = require('bluebird');
const client = require('iex-api');
const utils = require('./utils');

const iex = new client.IEXClient(fetch);

const initPortfolio = ['fb', 'aapl', 'nflx', 'goog'];

const getStockQuote = async (stock) => {
  try {
    const data = await iex.stockQuote(stock);
    const { latestPrice, change, companyName, symbol } = data;

    return {
      title: companyName,
      data: {
        price: latestPrice,
        change: change,
        symbol
      }
    }  
  } catch (error) {
    console.error(error);
  }
}

const getOneDayHistory = async (stock) => {
  try {
    const oneDayHistory = await iex.stockChart(stock, 'dynamic');
    const pricesByMinute = oneDayHistory.data.map(el => {
      return { time: el.minute, price: el.average };
    })

    return utils.adjustMissingPrices(pricesByMinute);
  } catch (error) {
    console.error(error);
  }
}

const getInitPortfolio = async (portfolio = initPortfolio) => {
  try {
    const summaryData = await promise.map(portfolio, async (stock) => {
      const data = await getStockQuote(stock);
      data.oneDayHistory = await getOneDayHistory(stock);

      console.log('data history is: ', data.history);
      return data;
    });
    
    return summaryData;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getInitPortfolio,
  getOneDayHistory
}