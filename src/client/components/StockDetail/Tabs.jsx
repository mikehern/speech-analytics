import React, { Component } from 'react';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: ''
    }
  }

  render() {
    return(
      <React.Fragment>
        {this.props.render}
        TABS
      </React.Fragment>
    )
  }
}

export default Tabs;
