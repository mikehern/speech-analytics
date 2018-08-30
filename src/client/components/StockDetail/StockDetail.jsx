import React, { Component } from 'react';
import StockTimeseries from './StockTimeseries';

class StockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    }
  }

  render() {
    return(
      <div className="stockdetail-wrapper">
        STOCKDETAIL
        <StockTimeseries />
      </div>
    )
  }
}

export default StockDetail;
