import React, { Component } from 'react';
import Tab from './Tab';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: ['1D', '1M', '3M', 'YTD', '1Y', '5Y'],
      activeTab: '1D'
    }

    this._clickHandler = this._clickHandler.bind(this);
  }

  _clickHandler(option) {
    this.setState({ activeTab: option })
  }

  render() {
    const { options, activeTab } = this.state;
    const tabs = options.map(option => {
      return (
        <Tab
          clicked={this._clickHandler}
          key={option}
          label={option}
          isActive={(activeTab === option)} />);
    });
    return(
      <div className="tabbar">{tabs}</div>
    );
  }
}

export default TabBar;
