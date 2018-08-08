import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { defineCustomElements as defineMolecule } from '@openchemistry/molecule-vtkjs';
import { defineCustomElements as defineSplitMe } from 'split-me';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

defineMolecule(window);
defineSplitMe(window);
