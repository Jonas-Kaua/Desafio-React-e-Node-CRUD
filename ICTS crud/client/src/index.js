import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Produtos from './Produtos'
import Compras from './Compras'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path = "/" exact component = {App}></Route>
        <Route path = "/produtos" component = {Produtos}></Route>
        <Route path = "/compras" component = {Compras}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
