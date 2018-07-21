import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { scaleTime, scaleLinear } from '../../../node_modules/d3-scale';
import { extent } from '../../../node_modules/d3-array';
import { area } from '../../../node_modules/d3-shape';


class Sparkline extends Component {
  
  _drawLine() {
    const {
      history, containerHeight, containerWidth, priceDidIncrease
    } = this.props;

    const data = history.map(el => {
      el.time = new Date(el.time);
      return el;
    })

    let xScale = scaleTime()
      .domain(extent(data, d => d.time))
      .range([0, containerWidth]);
    
    let yScale = scaleLinear()
      .domain(extent(data, d => d.price))
      .range([containerHeight, 0]);
    
    let lineChart = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.price));
    
    return (
      <path className=
        {"sparkline-path " + (priceDidIncrease ? 
          "sparkline-path--green" : "sparkline-path--red")
        }
        d={lineChart(history)}
      />
    )
  }

  _drawArea() {
    const {
      history, containerHeight, containerWidth, priceDidIncrease
    } = this.props;

    const data = history.map(el => {
      el.time = new Date(el.time);
      return el;
    })
    
    let xScale = scaleTime()
      .domain(extent(data, d => d.time))
      .range([0, containerWidth]);

    let yScale = scaleLinear()
      .domain(extent(data, d => d.price))
      .range([containerHeight, 0]);

    let areaChart = area()
      .x(d => xScale(d.time))
      .y0(containerHeight)
      .y1(d => yScale(d.price));

    return(
      <path className="sparkline-area"
        d={areaChart(history)}
      ></path>
    )
  }
  
  render() {
    return(
      <svg className="sparkline"
        width={this.props.containerWidth}
        height={this.props.containerHeight}
      >
        {this._drawLine()}
        {this._drawArea()}
      </svg>
    )
  }
}

const options = {
  className: 'sparkline-wrapper',
  containerStyle: {
    height: '70%'
  }
}

export default Dimensions(options)(Sparkline);
