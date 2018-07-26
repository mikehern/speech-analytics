const moment = require('moment');
const tz = require('moment-timezone');

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

const getTime = () => {
  const time = moment().tz('America/New_York');

  return {
    hour: time.format('H'),
    minute: time.format('m'),
    day: time.day()
  }
}

const isDuringTradingHours = () => {
  const time = getTime();

  const isTradingDay = () => (time.day < 6);
  const isTradingHours = () => {
    return (
      (time.hour >= 9 && time.minute >= 30) ||
      (time.hour <= 16)
    )
  }

  return (isTradingDay() && isTradingHours());
}

const formatTimeAndDate = (time, date) => {
  const dateAndTime = `${date} ${time}`;
  return moment(dateAndTime, 'YYYYMMDD hh:mm')
    .format('YYYY-MM-DD hh:mm');
}


module.exports = {
  adjustMissingPrices,
  isDuringTradingHours,
  formatTimeAndDate
}
