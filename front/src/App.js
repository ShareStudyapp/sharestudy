import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import './App.css';
import 'antd/dist/antd.css';
import { Provider } from "react-redux";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/reports" component={Reports} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
