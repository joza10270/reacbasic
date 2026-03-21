import React from 'react';
import ReactDOM from 'react-dom/client';
// Para utilizar Routes en el App.jsx
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx';


const rootElement = document.getElementById('root');
if (!rootElement) {
 throw new Error("Could not find root element to mount to");
}


const root = ReactDOM.createRoot(rootElement);


root.render(
 <React.StrictMode>
   <BrowserRouter>
     <App />
   </BrowserRouter>
 </React.StrictMode>
);
