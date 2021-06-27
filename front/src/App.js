import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_INFO_REQUEST } from './reducers/user';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import './style/common.scss';
import jwt_decode from 'jwt-decode';

const Todo = lazy(() => import('./pages/Todo'));
const Signup = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const Noti = lazy(() => import('./pages/Noti'));
const FeedEdit = lazy(() => import('./pages/Feed/FeedEdit'));
const SignupCom = lazy(() => import('./pages/SignUp/signupCom'));
const Setting = lazy(() => import('./pages/Setting'));
const SetProfile = lazy(() => import('./pages/Setting/setProfile'));
const Complaint = lazy(() => import('./pages/Setting/complaint'));
const Alarm = lazy(() => import('./pages/Setting/alarm'));
const Profile = lazy(() => import('./pages/Profile'));
const DayProfile = lazy(() => import('./pages/Profile/Day'));

const Loading = () => (
  <div className="loading">
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      try {
        const { exp } = jwt_decode(user);
        if (Date.now() >= exp * 1000) {
          window.localStorage.removeItem('user');
        } else {
          dispatch({
            type: USER_INFO_REQUEST
          });
        }
      } catch (e) {
        window.localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div id="main_container" className="main_container">
      <Router>
        <Suspense fallback={<Loading />}>
          <CacheSwitch>
            <CacheRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signup-complete" component={SignupCom} />
            <Route exact path="/todo" component={Todo} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/profile/:id/:date" component={DayProfile} />
            <Route exact path="/noti" component={Noti} />
            <Route exact path="/feed/edit" component={FeedEdit} />
            <Route exact path="/feed/edit/:id" component={FeedEdit} />
            <Route exact path="/feed/:id" component={Feed} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/setprofile" component={SetProfile} />
            <Route exact path="/complaint" component={Complaint} />
            <Route exact path="/alarm" component={Alarm} />
            <Redirect path="*" to="/" />
          </CacheSwitch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
