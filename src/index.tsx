import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './index/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<IndexPage />, document.getElementById('root'));
serviceWorker.unregister();
