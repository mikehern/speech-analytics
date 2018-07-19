import React from 'react';

const StockQuote = (props) => {
  const { name, data } = props;
  const { symbol, price, change } = data;
  return(
    <div className="stockquote-wrapper">
      <div className="stockquote-symbol">{symbol}</div>
      <div className="stockquote-name">{name}</div>
      <div className="stockquote-sparkline">SPARKLINE HERE</div>
      <div className="stockquote-price">{price}</div>
      <div className="stockquote-change--wrapper">
        <div className="stockquote-change">{change}</div>
      </div>
    </div>
  )
}

export default StockQuote;