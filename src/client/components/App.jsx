import React, { Component } from 'react';
import Header from './header';
import '../styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      stocks: []
    };
  }

  componentDidMount() {
    fetch('/api/getusername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));

    fetch('/api/getportfolio')
      .then(res => res.json())
      .then(data => this.setState({ stocks: data.portfolio }));
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="sidebar">
            <h5>Sidebar</h5>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
            <div className="test-row"> number 1 </div>
          </div>
          <div className="content">
            <h5>Content</h5>
          </div>
        </div>
        <footer>
          <div className="footer">
            <h5>Footer</h5>
            ✌🏼 mikehern
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
