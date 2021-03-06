/* global document */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SeriesEntry } from '@crlife/Models';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const SSR_DATA = document.getElementById('__CRL_SSR_DATA').innerText;
const entry = JSON.parse(SSR_DATA) as SeriesEntry;

ReactDOM.render(<App entry={entry} />, document.getElementById('root'));
