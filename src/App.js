import React, { Component } from 'react';
import { BenzeneWithHomo, Caffeine } from '@openchemistry/sample-data';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentRef0 = null;
  componentRef1 = null;

  constructor(props) {
    super(props);
    this.state = {
      molecules: [
        BenzeneWithHomo,
        Caffeine
      ],
      moleculesStr: [
        JSON.stringify(BenzeneWithHomo),
        JSON.stringify(Caffeine)
      ]
    };
  }

  componentDidMount() {
    this._setWcProps({...this.state});
  }

  componentDidUpdate(){
    this._setWcProps({...this.state});
  }

  _setWcProps(state){
    this.componentRef0.cjson = state.molecules[0];
    this.componentRef1.cjson = state.molecules[1];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{display: "flex"}}>
          <div style={{width: "50%", height: "20rem", position: "relative"}}>
            <oc-molecule-moljs ref={node=>this.componentRef0 = node}/>
          </div>
          <div style={{width: "50%", height: "20rem", position: "relative"}}>
            <oc-molecule-moljs ref={node=>this.componentRef1 = node}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
