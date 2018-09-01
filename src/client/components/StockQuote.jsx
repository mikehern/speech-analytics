import React from 'react';
import Sparkline from './Sparkline';

const StockQuote = (props) => {
  const { name, data, history, clickedStock } = props;
  const { symbol, price, change } = data;

  const priceDidIncrease = (change > 0);
  return (
    <div className="stockquote-wrapper" onClick={() => clickedStock(symbol)}>
      <div className="stockquote-symbol">{symbol}</div>
      <div className="stockquote-name">{name}</div>
      <div className="stockquote-sparkline">
        <Sparkline history={history}
          priceDidIncrease={priceDidIncrease}
        />
      </div>
      <div className="stockquote-price">{price}</div>
      <div className="stockquote-change--wrapper">
        <div className=
          {"stockquote-change " +
              (priceDidIncrease ? "stockquote-change--green"
              : "stockquote-change--red")
          }>
          {change}
        </div>
      </div>
    </div>
  )
}

export default StockQuote;