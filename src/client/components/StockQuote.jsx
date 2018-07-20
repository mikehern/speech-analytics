import React from 'react';
import Sparkline from './Sparkline';

const StockQuote = (props) => {
  const { name, data, history } = props;
  const { symbol, price, change } = data;
  return (
    <div className="stockquote-wrapper">
      <div className="stockquote-symbol">{symbol}</div>
      <div className="stockquote-name">{name}</div>
      <div className="stockquote-sparkline">
        <Sparkline history={history} />
      </div>
      <div className="stockquote-price">{price}</div>
      <div className="stockquote-change--wrapper">
        <div className=
          {"stockquote-change " +
              ((change < 0) ? "stockquote-change--red"
              : "stockquote-change--green")
          }>
          {change}
        </div>
      </div>
    </div>
  )
}

export default StockQuote;