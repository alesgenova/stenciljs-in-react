import React, { Component } from 'react';
import { Caffeine, BenzeneWithHomo } from '@openchemistry/sample-data';
import logo from './logo.svg';
import './App.css';
import { wc } from './utils/webcomponent';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{width: "100%", height: "20rem"}}>
          <split-me n="2">
              <oc-molecule-vtkjs
                slot="0"
                ref={wc(
                  // Events
                  {},
                  // Props
                  {
                    cjson: {...Caffeine}
                  }
                )}
              />
              <oc-molecule-vtkjs
                slot="1"
                ref={wc(
                  // Events
                  {},
                  // Props
                  {
                    cjson: BenzeneWithHomo
                  }
                )}
              />
          </split-me>
        </div>
      </div>
    );
  }

}

export default App;
