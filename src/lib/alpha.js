const config = require('../../config/config');
const moment = require('moment');
const alpha = require('alphavantage')({ key: config.ALPHAVANTAGE });

const initPortfolio = [`^DJI`, `^GSPC`];

//Generalizes key to flexibly handle any time interval
const timeLabelHelper = (data) => {
  return Object
    .keys(data)
    .filter(el => el.includes('Time Series'));
}

const getCurrentPrice = (timeSeries) => {
  const timeLabel = timeLabelHelper(timeSeries);
  const latestTime = timeSeries['Meta Data']['3. Last Refreshed'];
  const latestPrice = timeSeries[timeLabel][latestTime]['4. close'];

  return latestPrice;
}

const getLastClosingDayPrice = async (symbol) => {
  try {
    const today = moment().format().split('T')[0];
  
    const results = await alpha.data.daily(symbol);
    const timeLabel = timeLabelHelper(results);
    const sortedTimeSeries = Object
      .entries(results[timeLabel])
      .sort((a, b) => new Date(b[0]) - new Date(a[0]));
  
    const lastClosingDayPrice = (sortedTimeSeries[0][0] === today) ?
      sortedTimeSeries[1][1]['4. close'] : sortedTimeSeries[0][1]['4. close'];
  
    return lastClosingDayPrice;
  } catch (err) {
    console.error(err);
  }
}

const getIntraday = async (symbol, outputsize, datatype, interval=`1min`) => {
  try {
    const results = await alpha.data.intraday(symbol, null, null, interval);
    return results;
  } catch (err) {
    console.error(err);
  }
}

const getSummaryData = async (symbol) => {
  try {
    const lastClosingPrice = await getLastClosingDayPrice(symbol);
    const timeSeries = await getIntraday(symbol);
    const currentPrice = getCurrentPrice(timeSeries);
    const netPrice = (currentPrice - lastClosingPrice).toFixed(2);
    const symbolName = timeSeries['Meta Data']['2. Symbol'];
    return {
      currentPrice,
      change: netPrice,
      name: symbolName,
      symbol
    };
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getSummaryData
}