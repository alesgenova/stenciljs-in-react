import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { defineCustomElements as defineMolecule } from '@openchemistry/molecule-vtkjs/dist/loader';
import { defineCustomElements as defineSplitMe } from 'split-me/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

defineMolecule(window);
defineSplitMe(window);
