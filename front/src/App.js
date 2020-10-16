import React,{Suspense, lazy } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
//const Navbar = lazy(()=>import('./components/Navbar'));
// const Home = lazy(()=>import('./pages/Home'));
const Signup = lazy(()=>import('./pages/Signup'));
const Products = lazy(()=>import('./pages/Products'));
const Profile = lazy(()=>import('./pages/Profile/Profile'));
const TodoList = lazy(()=>import('./pages/TodoList/TodoList'));
const Messenger = lazy(()=>import('./pages/Messenger'));
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/products" component={Products} />
          <Route path="/profile" component={Profile} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/messenger" component={Messenger} />
        </Switch>
      </Suspense>
    </Router>
    </>
  );
}

export default App;
