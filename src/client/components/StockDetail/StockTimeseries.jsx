import React, { Component } from 'react';
import PriceTimeseries from './PriceTimeseries';
import VolumeTimeseries from './VolumeTimeseries';
import TabBar from './TabBar';

class StockTimeseries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: ''
    }
  }

  render() {
    return(
      <div className="stockdetail-timeseries">
        <TabBar />
        <PriceTimeseries />
        <VolumeTimeseries />
      </div>
    )
  }
}

export default StockTimeseries;
