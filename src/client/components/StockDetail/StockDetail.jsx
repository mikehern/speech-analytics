import React, { Component } from 'react';
import StockTimeseries from './StockTimeseries';

class StockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerSymbol: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedStock !== this.props.selectedStock) {
      this.setState({ tickerSymbol: this.props.selectedStock });
    }
  }

  render() {
    const { tickerSymbol } = this.state;
    return(
      <div className="stockdetail-wrapper">
        <StockTimeseries tickerSymbol={tickerSymbol}/>
      </div>
    )
  }
}

export default StockDetail;
