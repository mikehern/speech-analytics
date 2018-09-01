import React, { Component } from 'react';
import Header from './Header';
import StockQuote from './StockQuote';
import StockDetail from './StockDetail/StockDetail';
import '../styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      selectedStock: ''
    };
  }

  componentDidMount() {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => this.setState({ stocks: data.portfolio }));
  }

  _clickedStock(symbol) {
    this.setState({ selectedStock: symbol });
  }

  render() {
    const { stocks, selectedStock } = this.state;
    const quotes = stocks.map(stock => {
      return (
        <StockQuote key={stock.title}
          name={stock.title}
          data={stock.data}
          history={stock.priceHistory}
          clickedStock={(symbol) =>  this._clickedStock(symbol)}
        />
      );
    });
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="sidebar">
            <h5>Sidebar</h5>
            {quotes}
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
            <StockDetail selectedStock={selectedStock}/>
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
