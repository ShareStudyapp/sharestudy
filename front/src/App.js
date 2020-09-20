import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Products from './pages/Products';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/products" component={Products} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
