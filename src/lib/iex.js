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
        price: latestPrice.toFixed(2),
        change: change.toFixed(2),
        symbol
      }
    }  
  } catch (error) {
    console.error(error);
  }
}

const getPriceHistory = async (stock) => {
  try {
    const prices = await iex.stockChart(stock, 'dynamic');
    //iex returns different data depnding on whether market is open
    const priceHistory = (prices.range === '1m') ?
      prices.data.map(el => {
        return { time: el.date, price: el.close }
      })
      :
      utils.adjustMissingPrices(prices.data.map(el => {
        return { time: el.minute, price: el.average };
      }));

    return priceHistory;
  } catch (error) {
    console.error(error);
  }
}

const getInitPortfolio = async (portfolio = initPortfolio) => {
  try {
    const summaryData = await promise.map(portfolio, async (stock) => {
      const data = await getStockQuote(stock);
      data.priceHistory = await getPriceHistory(stock);

      return data;
    });
    
    return summaryData;
  } catch (error) {
    console.error(error);
  }
}

const getStockTimeSeries = async (stockSymbol, range = 'dynamic') => {
  try {
    const dataOverTime = await iex.stockChart(stockSymbol, range);

    return dataOverTime.map(el => {
      const { date, open, high, low, close, volume } = el;
      return {
        date, open, high, low, close, volume
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getInitPortfolio,
  getPriceHistory,
  getStockTimeSeries
}