const moment = require('moment');

const adjustMissingPrices = (history, ...prices) => {
  const priceList = [...prices];

  if (priceList.length > 0) {
    history.forEach(el => {
      priceList.forEach(price => {
        if(el[price] === -1 || el[price] === undefined) {
          const formatted = price[0].toUpperCase() + price.slice(1);
          const market = `market${formatted}`;

          el[price] = el[market];
        }
      });
      
      return el;
    });

    return history;
  }

  let lastValidValue = 0;

  return history.map(el => {
    if (el.price !== -1) {
      lastValidValue = el.price;
    } else if (el.price === -1) {
      el.price = lastValidValue;
    }

    return el;
  });
}

const formatTimeAndDate = (time, date) => {
  const dateAndTime = `${date} ${time}`;
  return moment(dateAndTime, 'YYYYMMDD hh:mm')
    .format('YYYY-MM-DD HH:mm');
}


module.exports = {
  adjustMissingPrices,
  formatTimeAndDate
}
