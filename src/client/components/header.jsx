import React from 'react';
import moment from 'moment';

const Header = (props) => {
  const date = `${moment().format('MMMM D')}`.toUpperCase();
  
  return (
    <div className="header">
      <div className="header-title--color">STOCKS</div>
      <div>{date}</div>
    </div>
  )
}

export default Header;