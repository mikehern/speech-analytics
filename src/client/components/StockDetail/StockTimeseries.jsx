import React, { Component } from 'react';
import PriceTimeseries from './PriceTimeseries';
import VolumeTimeseries from './VolumeTimeseries';
import Tabs from './Tabs';

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
        <Tabs render="">
        </Tabs>
        <PriceTimeseries />
        <VolumeTimeseries />
      </div>
    )
  }
}

export default StockTimeseries;
