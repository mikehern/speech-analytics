const moment = require('moment');

const adjustMissingPrices = (history) => {
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
