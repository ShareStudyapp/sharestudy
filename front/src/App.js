import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { USER_INFO_REQUEST } from './reducers/user';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import './style/common.scss';

const Todo = lazy(() => import('./pages/Todo'));
const Signup = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const MyFeed = lazy(() => import('./pages/Feed/MyFeed'));
const NewsFeed = lazy(() => import('./pages/Feed/NewsFeed'));

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const dispatch = useDispatch();

  const user = window.sessionStorage.getItem('user'); //로그인여부
  const userPersist = () => {
    if (user) {
      console.log('호출');
      dispatch({
        type: USER_INFO_REQUEST
      });
    }
  };
  userPersist();

  return (
    <div className="main_container">
      <Router>
        <Suspense
          fallback={
            <SyncLoader css={override} size={20} color="green" loading style={{ width: 50 }} />
          }
        >
          <CacheSwitch>
            <CacheRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/todo" component={Todo} />
            <Route exact path="/myfeed" component={MyFeed} />
            <Route exact path="/newsfeed" component={NewsFeed} />
            <Redirect path="*" to="/" />
          </CacheSwitch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
