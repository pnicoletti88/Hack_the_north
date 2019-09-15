import React from 'react';
import './App.css';
import img from './assets/freshbooks-logo-white.png'
import Chart from './components/Chart';
import Reconcilliation from "./components/Reconcillation/Reconcillation";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      chart: true
    }
  }
  render(){
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
          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
          <div className="centerBaby">
            <Reconcilliation/>
          </div>
          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
        </div>
        <div className="terminal-holder container">
          
        </div>
      </div>
    );
  }
}

export default App;
