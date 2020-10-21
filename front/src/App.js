import React,{Suspense, lazy } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import MainNav from './components/MainNav';
//const Navbar = lazy(()=>import('./components/Navbar'));
// const Home = lazy(()=>import('./pages/Home'));
const Signup = lazy(()=>import('./pages/Signup'));
const Products = lazy(()=>import('./pages/Products'));
const Profile = lazy(()=>import('./pages/Profile/Profile'));
const TodoList = lazy(()=>import('./pages/TodoList/TodoList'));
const MyTodoList = lazy(()=>import('./pages/TodoList/MyTodoList'));
const Messenger = lazy(()=>import('./pages/Messenger'));
function App() {
  return (
    <div className="main_container">
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/products" component={Products} />
          <Route path="/profile" component={Profile} />
          <Route path="/todolist" component={TodoList} />
          <Route path="/mytodolist" component={MyTodoList} />
          <Route path="/messenger" component={Messenger} />
        </Switch>
      </Suspense>
      <MainNav />
    </Router>
    </div>
  );
}

export default App;
