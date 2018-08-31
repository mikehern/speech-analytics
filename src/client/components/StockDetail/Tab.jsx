import React from 'react';

const Tab = ({ isActive, label, clicked }) => {
  const clickHandler = () => clicked(label);
  const style = "tabbar-tab" + (isActive ? "--active" : "--inactive");
  return (
    <div className={style} onClick={() => clickHandler()}>{label}</div>
  )
}

export default Tab;
