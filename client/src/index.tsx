/* global document */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LinkedSeries } from '@models/Models';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const SSR_DATA = document.getElementById('__CRL_SSR_DATA').innerText;
const series = JSON.parse(SSR_DATA) as LinkedSeries;

ReactDOM.render(<App series={series} />, document.getElementById('root'));
