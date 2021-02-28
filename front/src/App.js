import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import { SyncLoader } from "react-spinners";
import { css } from "@emotion/core";
import { USER_INFO_REQUEST } from "./reducers/user";
import CacheRoute, { CacheSwitch } from "react-router-cache-route";
import "./style/common.scss";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const dispatch = useDispatch();

  const user = window.sessionStorage.getItem("user"); //로그인여부
  const userPersist = () => {
    if (user) {
      console.log("호출");
      dispatch({
        type: USER_INFO_REQUEST,
      });
    }
  };
  userPersist();

  return (
    <div className="main_container">
      <Router>
        <Suspense
          fallback={
            <SyncLoader
              css={override}
              size={20}
              color="green"
              loading
              style={{ width: 50 }}
            />
          }
        >
          <CacheSwitch>
            <CacheRoute exact path="/" component={Home} />
          </CacheSwitch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
