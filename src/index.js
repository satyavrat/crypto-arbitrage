import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


let apiKey = (document.location.hash||'').split('=')[1];

ReactDOM.render(<App apiKey={apiKey} />, document.getElementById('root'));    
registerServiceWorker();
