import React from 'react';
import './App.css';
import img from './assets/freshbooks-logo-white.png'
import Chart from './components/Chart';

function App() {
  return (
    <div className="App">
      <div className="header-holder d-flex">
        <img src={img} className="freshbooks-logo" alt="FreshBooks"/>
        <h1 className="freshbooks-heading">
          Encrypto
        </h1>
      </div>
      <div className="chart-holder container">
        <Chart/>
      </div>
    </div>
  );
}

export default App;
