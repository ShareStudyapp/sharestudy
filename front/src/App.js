import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_INFO_REQUEST } from './reducers/user';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import './style/common.scss';

const Todo = lazy(() => import('./pages/Todo'));
const Signup = lazy(() => import('./pages/SignUp'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const Noti = lazy(() => import('./pages/Noti'));
const UpLoad = lazy(() => import('./pages/Feed/FeedUpload'));
const SignupCom = lazy(() => import('./pages/SignUp/signupCom'));
const Setting = lazy(() => import('./pages/Setting'));
const SetProfile = lazy(() => import('./pages/Setting/setProfile'));
const Complaint = lazy(() => import('./pages/Setting/complaint'));
const Profile = lazy(() => import('./pages/Profile'));

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
        <Suspense fallback={<Loading />}>
          <CacheSwitch>
            <CacheRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signup-complete" component={SignupCom} />
            <Route exact path="/todo" component={Todo} />
            <Route exact path="/feed/:id" component={Feed} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/noti" component={Noti} />
            <Route exact path="/upload" component={UpLoad} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/setprofile" component={SetProfile} />
            <Route exact path="/complaint" component={Complaint} />
            <Redirect path="*" to="/" />
          </CacheSwitch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
