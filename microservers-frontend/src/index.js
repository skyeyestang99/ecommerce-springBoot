import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import WrappedApp from './WrappedApp';

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
     <WrappedApp />
  //  {</React.StrictMode>
)


reportWebVitals();
