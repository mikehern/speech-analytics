import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { scaleTime, scaleLinear } from '../../../node_modules/d3-scale';
import { extent } from '../../../node_modules/d3-array';
import { area } from '../../../node_modules/d3-shape';


class Sparkline extends Component {

  _createScales() {
    const { history, containerHeight, containerWidth } = this.props;

    const data = history.map(el => {
      el.time = new Date(el.time);
      return el;
    })

    const x = scaleTime()
      .domain(extent(data, d => d.time))
      .range([0, containerWidth]);

    const y = scaleLinear()
      .domain(extent(data, d => d.price))
      .range([containerHeight, 0]);

    return { x, y };
  }
  
  _drawLine() {
    const { history, priceDidIncrease } = this.props;

    const scale = this._createScales();
    
    const lineChart = d3.line()
      .x(d => scale.x(d.time))
      .y(d => scale.y(d.price));
    
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
    const { history, containerHeight, priceDidIncrease } = this.props;

    const scale = this._createScales();

    const areaChart = area()
      .x(d => scale.x(d.time))
      .y0(containerHeight)
      .y1(d => scale.y(d.price));

    return( 
      <path className={"sparkline-area--" + ((priceDidIncrease) ? "green" : "red")}
        d={areaChart(history)}
      />
    )
  }
  
  render() {
    const { priceDidIncrease, containerHeight, containerWidth } = this.props;

    const greenGradient = 'rgba(64,219,94,0.10)';
    const redGradient = 'rgba(235,0,46,0.10)';
    const areaColor = (priceDidIncrease) ? greenGradient : redGradient;

    return(
      <svg className="sparkline"
        width={containerWidth}
        height={containerHeight}
      >
        <linearGradient id={"sparkline-area--" + (priceDidIncrease ? "green" : "red")}
          gradientUnits="userSpaceOnUse"
          x1="0" x2="0" y1="0" y2="40"
        >
          <stop offset="0%" stopColor={areaColor}></stop>
          <stop offset="100%" stopColor="black"></stop>
        </linearGradient>
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
