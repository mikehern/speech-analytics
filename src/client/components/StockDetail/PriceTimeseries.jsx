import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import { axisBottom, axisRight } from 'd3-axis';

const chartMargins = { top: 20, right: 60, bottom: 50 };

class PriceTimeseries extends Component {
  constructor(props) {
    super(props);
    this.xAxis = React.createRef();
    this.yAxis = React.createRef();
  }
  
  _createAxes() {
    const xNode = this.xAxis.current;
    const yNode = this.yAxis.current;

    const scales = this._createScales();

    const xAxis = axisBottom().scale(scales.x).ticks(d3.timeHour);
    const yAxis = axisRight().scale(scales.y).ticks(5);
    
    d3.select(xNode).call(xAxis);
    d3.select(yNode).call(yAxis);
  }

  _createScales() {
    const { data, containerHeight, containerWidth } = this.props;

    const timeSeries = data.map(datum => {
      datum.date = new Date(datum.date);
      return datum;
    });

    const x = scaleTime()
      .domain(extent(timeSeries, d => d.date))
      .range([0, containerWidth - chartMargins.right])
      .nice();

    const y = scaleLinear()
      .domain(extent(timeSeries, d => d.close))
      .range([containerHeight - chartMargins.bottom, chartMargins.top])
      .nice();

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
    const { data, containerHeight } = this.props;

    const scale = this._createScales();

    const areaChart = d3.area()
      .x(d => scale.x(d.date))
      .y0(containerHeight)
      .y1(d => scale.y(d.close));

    return(
      <path className="pricechart-area" d={areaChart(data)} />
    )
  }


  componentDidMount() {
    this._createAxes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this._createAxes();
    }
  }


  render() {
    const { containerWidth, containerHeight } = this.props

    return (
      <div className="stockdetail-price">
        <svg className="pricechart" width={containerWidth} height={containerHeight}>
          <linearGradient id="pricechart-area--gradient"
            gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="250">
            <stop offset="0%" stopColor="rgba(95,103,255,0.3)" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          {this._drawLine()}
          {this._drawArea()}
          <g ref={this.xAxis}
            className="pricechart-axis"
            transform={`translate(0, ${containerHeight - chartMargins.top})`} />
          <g ref={this.yAxis}
            className="pricechart-axis"
            transform={`translate(${containerWidth - chartMargins.right}, 0)`} />
        </svg>
      </div>
    );
  }
}

const options = {
  containerStyle: {
    height: '250px',
    marginTop: '.5em'
  }
}

export default Dimensions(options)(PriceTimeseries);
