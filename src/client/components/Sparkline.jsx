import React, { Component } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';


class Sparkline extends Component {
  render() {
    return(
      <svg className="sparkline"
        ref={node => (this.node = node)}
        width={this.props.containerWidth}
        height={this.props.containerHeight}
      >
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
