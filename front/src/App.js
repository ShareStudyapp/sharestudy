import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Profile from './pages/Profile/Profile';
import TodoList from './pages/TodoList/TodoList';
import Messenger from './pages/Messenger';
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
        <Route path="/profile" component={Profile} />
        <Route path="/todolist" component={TodoList} />
        <Route path="/messenger" component={Messenger} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
