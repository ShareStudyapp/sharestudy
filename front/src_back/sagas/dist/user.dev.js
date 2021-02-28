"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = userSaga;

var _effects = require("redux-saga/effects");

var _axios = _interopRequireDefault(require("axios"));

var _user = require("../reducers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(signUp),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(logIn),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(logOut),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(userInfo),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(uploadProfileImages),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(follow),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(followCancle),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(followerList),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(followingList),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(otherUserInfo),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(userInfoUpdate),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLogIn),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(watchSignUp),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLogOut),
    _marked15 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUserInfo),
    _marked16 =
/*#__PURE__*/
regeneratorRuntime.mark(watchProfileUploadImages),
    _marked17 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFollow),
    _marked18 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFollowCancle),
    _marked19 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFollowerList),
    _marked20 =
/*#__PURE__*/
regeneratorRuntime.mark(watchFollowingList),
    _marked21 =
/*#__PURE__*/
regeneratorRuntime.mark(watchOtherUserInfo),
    _marked22 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUserInfoUpdate),
    _marked23 =
/*#__PURE__*/
regeneratorRuntime.mark(userSaga);

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  console.log(signUpData);
  return _axios["default"].post('/api/auth/signup', signUpData);
}

function signUp(action) {
  return regeneratorRuntime.wrap(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(signUpAPI, action.data);

        case 3:
          _context.next = 5;
          return (0, _effects.put)({
            // put은 dispatch 동일
            type: _user.SIGN_UP_SUCCESS
          });

        case 5:
          _context.next = 12;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          // loginAPI 실패
          console.error(_context.t0);
          _context.next = 12;
          return (0, _effects.put)({
            type: _user.SIGN_UP_FAILURE,
            error: _context.t0
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 7]]);
}

function logInAPI(data) {
  return _axios["default"].post('/api/auth/signin', data);
}

function logIn(action) {
  var result, result2;
  return regeneratorRuntime.wrap(function logIn$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(logInAPI, action.data);

        case 3:
          result = _context2.sent;
          window.sessionStorage.setItem('user', result.data.jwt);
          window.sessionStorage.setItem('login_valid', "temp");
          _context2.next = 8;
          return (0, _effects.call)(userInfoAPI);

        case 8:
          result2 = _context2.sent;
          _context2.next = 11;
          return (0, _effects.put)({
            type: _user.LOG_IN_SUCCESS,
            data: result.data,
            data2: result2.data
          });

        case 11:
          _context2.next = 18;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          _context2.next = 18;
          return (0, _effects.put)({
            type: _user.LOG_IN_FAILURE,
            error: _context2.t0.response.data
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 13]]);
}

function logOutAPI(token) {
  return _axios["default"].post('/api/auth/logout', token);
}

function logOut(action) {
  return regeneratorRuntime.wrap(function logOut$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(logOutAPI, action.data);

        case 3:
          window.sessionStorage.removeItem('login_valid');
          window.sessionStorage.removeItem('user'); // window.sessionStorage.removeItem('userInfo');
          // window.sessionStorage.setItem('userInfo',[]);

          _context3.next = 7;
          return (0, _effects.put)({
            type: _user.LOG_OUT_SUCCESS
          });

        case 7:
          _context3.next = 14;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          _context3.next = 14;
          return (0, _effects.put)({
            type: _user.LOG_OUT_FAILURE,
            error: _context3.t0.response.data
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 9]]);
}

function userInfoAPI() {
  return _axios["default"].get('/api/auth/userinfo');
}

function userInfo() {
  var result;
  return regeneratorRuntime.wrap(function userInfo$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _effects.call)(userInfoAPI);

        case 3:
          result = _context4.sent;
          _context4.next = 6;
          return (0, _effects.put)({
            type: _user.USER_INFO_SUCCESS,
            data: result.data
          });

        case 6:
          _context4.next = 13;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          _context4.next = 13;
          return (0, _effects.put)({
            type: _user.USER_INFO_FAILURE,
            error: _context4.t0.response.data
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[0, 8]]);
}

function uploadProfileImagesAPI(data) {
  return _axios["default"].post('/api/auth/profileimage', data);
}

function uploadProfileImages(action) {
  var result;
  return regeneratorRuntime.wrap(function uploadProfileImages$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _effects.call)(uploadProfileImagesAPI, action.data);

        case 3:
          result = _context5.sent;
          _context5.next = 6;
          return (0, _effects.put)({
            type: _user.UPLOAD_PROFILE_IMAGES_SUCCESS,
            data: result.data
          });

        case 6:
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 12;
          return (0, _effects.put)({
            type: _user.UPLOAD_PROFILE_IMAGES_FAILURE,
            error: _context5.t0.response.data
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[0, 8]]);
}

function followAPI(id) {
  return _axios["default"].post("/user/following/".concat(id));
}

function follow(action) {
  var result;
  return regeneratorRuntime.wrap(function follow$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _effects.call)(followAPI, action.data);

        case 3:
          result = _context6.sent;
          _context6.next = 6;
          return (0, _effects.put)({
            type: _user.FOLLOW_SUCCESS,
            data: result.data
          });

        case 6:
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 12;
          return (0, _effects.put)({
            type: _user.FOLLOW_FAILURE,
            error: _context6.t0.response.data
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[0, 8]]);
}

function followCancleAPI(id) {
  return _axios["default"]["delete"]("/user/following/".concat(id));
}

function followCancle(action) {
  var result;
  return regeneratorRuntime.wrap(function followCancle$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _effects.call)(followCancleAPI, action.data);

        case 3:
          result = _context7.sent;
          _context7.next = 6;
          return (0, _effects.put)({
            type: _user.FOLLOW_CANCLE_SUCCESS,
            data: result.data
          });

        case 6:
          _context7.next = 12;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 12;
          return (0, _effects.put)({
            type: _user.FOLLOW_CANCLE_FAILURE,
            error: _context7.t0.response.data
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 8]]);
}

function followerListAPI(id) {
  return _axios["default"].get("/user/followerlist/".concat(id));
}

function followerList(action) {
  var result;
  return regeneratorRuntime.wrap(function followerList$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _effects.call)(followerListAPI, action.data);

        case 3:
          result = _context8.sent;
          _context8.next = 6;
          return (0, _effects.put)({
            type: _user.FOLLOWER_LIST_SUCCESS,
            data: result.data
          });

        case 6:
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          _context8.next = 12;
          return (0, _effects.put)({
            type: _user.FOLLOWER_LIST_FAILURE,
            error: _context8.t0.response.data
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, null, [[0, 8]]);
}

function followingListAPI(id) {
  return _axios["default"].get("/user/followinglist/".concat(id));
}

function followingList(action) {
  var result;
  return regeneratorRuntime.wrap(function followingList$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return (0, _effects.call)(followingListAPI, action.data);

        case 3:
          result = _context9.sent;
          _context9.next = 6;
          return (0, _effects.put)({
            type: _user.FOLLOWING_LIST_SUCCESS,
            data: result.data
          });

        case 6:
          _context9.next = 12;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          _context9.next = 12;
          return (0, _effects.put)({
            type: _user.FOLLOWING_LIST_FAILURE,
            error: _context9.t0.response.data
          });

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, null, [[0, 8]]);
}

function otherUserInfoAPI(id) {
  return _axios["default"].get("/user/otheruserInfo/".concat(id));
}

function otherUserInfo(action) {
  var result;
  return regeneratorRuntime.wrap(function otherUserInfo$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return (0, _effects.call)(otherUserInfoAPI, action.data);

        case 3:
          result = _context10.sent;
          _context10.next = 6;
          return (0, _effects.put)({
            type: _user.OTHER_USER_INFO_SUCCESS,
            data: result.data
          });

        case 6:
          _context10.next = 12;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          _context10.next = 12;
          return (0, _effects.put)({
            type: _user.OTHER_USER_INFO_FAILURE,
            error: _context10.t0.response.data
          });

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10, null, [[0, 8]]);
}

function userInfoUpdateAPI(data) {
  console.log(data);
  return _axios["default"].patch("/user/updateUser", data);
}

function userInfoUpdate(action) {
  var result;
  return regeneratorRuntime.wrap(function userInfoUpdate$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _effects.call)(userInfoUpdateAPI, action.data);

        case 3:
          result = _context11.sent;
          _context11.next = 6;
          return (0, _effects.put)({
            type: _user.USERINFO_UPDATE_SUCCESS,
            data: result.data
          });

        case 6:
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          _context11.next = 12;
          return (0, _effects.put)({
            type: _user.USERINFO_UPDATE_FAILURE,
            error: _context11.t0.response.data
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, null, [[0, 8]]);
}

function watchLogIn() {
  return regeneratorRuntime.wrap(function watchLogIn$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _effects.takeLatest)(_user.LOG_IN_REQUEST, logIn);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}

function watchSignUp() {
  return regeneratorRuntime.wrap(function watchSignUp$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _effects.takeLatest)(_user.SIGN_UP_REQUEST, signUp);

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}

function watchLogOut() {
  return regeneratorRuntime.wrap(function watchLogOut$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _effects.takeLatest)(_user.LOG_OUT_REQUEST, logOut);

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
}

function watchUserInfo() {
  return regeneratorRuntime.wrap(function watchUserInfo$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _effects.takeLatest)(_user.USER_INFO_REQUEST, userInfo);

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15);
}

function watchProfileUploadImages() {
  return regeneratorRuntime.wrap(function watchProfileUploadImages$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.takeEvery)(_user.UPLOAD_PROFILE_IMAGES_REQUEST, uploadProfileImages);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked16);
}

function watchFollow() {
  return regeneratorRuntime.wrap(function watchFollow$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _effects.takeLatest)(_user.FOLLOW_REQUEST, follow);

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  }, _marked17);
}

function watchFollowCancle() {
  return regeneratorRuntime.wrap(function watchFollowCancle$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _effects.takeLatest)(_user.FOLLOW_CANCLE_REQUEST, followCancle);

        case 2:
        case "end":
          return _context18.stop();
      }
    }
  }, _marked18);
}

function watchFollowerList() {
  return regeneratorRuntime.wrap(function watchFollowerList$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _effects.takeLatest)(_user.FOLLOWER_LIST_REQUEST, followerList);

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  }, _marked19);
}

function watchFollowingList() {
  return regeneratorRuntime.wrap(function watchFollowingList$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return (0, _effects.takeLatest)(_user.FOLLOWING_LIST_REQUEST, followingList);

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  }, _marked20);
}

function watchOtherUserInfo() {
  return regeneratorRuntime.wrap(function watchOtherUserInfo$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return (0, _effects.takeLatest)(_user.OTHER_USER_INFO_REQUEST, otherUserInfo);

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  }, _marked21);
}

function watchUserInfoUpdate() {
  return regeneratorRuntime.wrap(function watchUserInfoUpdate$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _effects.takeLatest)(_user.USERINFO_UPDATE_REQUEST, userInfoUpdate);

        case 2:
        case "end":
          return _context22.stop();
      }
    }
  }, _marked22);
}

function userSaga() {
  return regeneratorRuntime.wrap(function userSaga$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchSignUp), (0, _effects.fork)(watchLogIn), (0, _effects.fork)(watchUserInfo), (0, _effects.fork)(watchLogOut), (0, _effects.fork)(watchProfileUploadImages), (0, _effects.fork)(watchFollow), (0, _effects.fork)(watchFollowCancle), (0, _effects.fork)(watchFollowerList), (0, _effects.fork)(watchFollowingList), (0, _effects.fork)(watchOtherUserInfo), (0, _effects.fork)(watchUserInfoUpdate)]);

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  }, _marked23);
}