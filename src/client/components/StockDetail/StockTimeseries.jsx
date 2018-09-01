import React, { Component } from 'react';
import PriceTimeseries from './PriceTimeseries';
import VolumeTimeseries from './VolumeTimeseries';
import TabBar from './TabBar';

class StockTimeseries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      volume: [],
      interval: ''
    }
    this._fetchTimeSeries = this._fetchTimeSeries.bind(this);
  }

  _fetchTimeSeries(tickerSymbol, range = '1D') {
    fetch(`/api/stocktimeseries/${tickerSymbol}/${range}`)
      .then(res => res.json())
      .then(json => {
        const { stock } = json;
        const prices = stock.map(datum => {
          const { high, low, close, open, date } = datum;
          return { high, low, close, open, date };
        });
        const volume = stock.map(datum => {
          const { volume, date } = datum;
          return { volume, date };
        });

        this.setState({ prices, volume });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.tickerSymbol !== prevProps.tickerSymbol) {
      this._fetchTimeSeries(this.props.tickerSymbol);
    }
  }

  render() {
    const { prices, volume, interval } = this.state;
    return(
      <div className="stockdetail-timeseries">
        <TabBar />
        {(prices.length > 0) && <PriceTimeseries data={prices} />}
        {(volume.length > 0) && <VolumeTimeseries data={volume} />}
      </div>
    )
  }
}

export default StockTimeseries;
