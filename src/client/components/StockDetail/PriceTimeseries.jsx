import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

class PriceTimeseries extends Component {

  _createScales() {
    const { data, containerHeight, containerWidth } = this.props;

    const timeSeries = data.map(datum => {
      datum.date = new Date(datum.date);
      return datum;
    });

    const x = scaleTime()
      .domain(extent(timeSeries, d => d.date))
      .range([0, containerWidth]);

    const y = scaleLinear()
      .domain(extent(timeSeries, d => d.close))
      .range([containerHeight, 0]);

    return { x, y };
  }

  _drawLine() {
    const { data } = this.props;

    const scale = this._createScales();

    const lineChart = d3.line()
      .x(d => scale.x(d.date))
      .y(d => scale.y(d.close));

    return(
      <path className="pricechart-path" d={lineChart(data)} />
    )
  }

  _drawArea() {
    const { data, containerHeight, containerWidth } = this.props;

    const scale = this._createScales();

    const areaChart = d3.area()
      .x(d => scale.x(d.date))
      .y0(containerHeight)
      .y1(d => scale.y(d.close));

    return(
      <path className="pricechart-area" d={areaChart(data)} />
    )
  }

  render() {
    const { containerWidth, containerHeight } = this.props

    return(
      <div className="stockdetail-price">
        <svg className="pricechart"
          width={containerWidth}
          height={containerHeight}
        >
        <linearGradient id="pricechart-area--gradient"
          gradientUnits="userSpaceOnUse"
          x1="0" x2="0" y1="0" y2="250"
        >
          <stop offset="0%" stopColor="rgba(95,103,255,0.3)"></stop>
          <stop offset="100%" stopColor="black"></stop>
        </linearGradient>
        {this._drawLine()}
        {this._drawArea()}
        </svg>
      </div>
    )
  }
}

const options = {
  containerStyle: {
    height: '250px',
    marginTop: '.5em'
  }
}

export default Dimensions(options)(PriceTimeseries);
