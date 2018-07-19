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


module.exports = {
  adjustMissingPrices
}
