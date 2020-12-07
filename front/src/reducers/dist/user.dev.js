"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.logoutRequestAction = exports.loginRequestAction = exports.OTHER_USER_INFO_FAILURE = exports.OTHER_USER_INFO_SUCCESS = exports.OTHER_USER_INFO_REQUEST = exports.FOLLOWING_LIST_FAILURE = exports.FOLLOWING_LIST_SUCCESS = exports.FOLLOWING_LIST_REQUEST = exports.FOLLOWER_LIST_FAILURE = exports.FOLLOWER_LIST_SUCCESS = exports.FOLLOWER_LIST_REQUEST = exports.FOLLOW_CANCLE_FAILURE = exports.FOLLOW_CANCLE_SUCCESS = exports.FOLLOW_CANCLE_REQUEST = exports.FOLLOW_FAILURE = exports.FOLLOW_SUCCESS = exports.FOLLOW_REQUEST = exports.UPLOAD_PROFILE_IMAGES_FAILURE = exports.UPLOAD_PROFILE_IMAGES_SUCCESS = exports.UPLOAD_PROFILE_IMAGES_REQUEST = exports.USER_INFO_FAILURE = exports.USER_INFO_SUCCESS = exports.USER_INFO_REQUEST = exports.LOG_OUT_FAILURE = exports.LOG_OUT_SUCCESS = exports.LOG_OUT_REQUEST = exports.LOG_IN_FAILURE = exports.LOG_IN_SUCCESS = exports.LOG_IN_REQUEST = exports.SIGN_UP_FAILURE = exports.SIGN_UP_SUCCESS = exports.SIGN_UP_REQUEST = exports.USER_RESET = exports.initialState = void 0;

var _produce = _interopRequireDefault(require("../utils/produce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  logInDone: false,
  // 로그인 여부
  logInLoading: false,
  // 로그인 시도중
  logInError: '',
  // 로그인 실패 사유
  logOutLoading: false,
  // 로그아웃 시도중
  logOutDone: false,
  //로그아웃완료
  signUpLoading: false,
  // 회원가입 시도중
  signUpDone: false,
  //회원가입 성공
  signUpError: null,
  me: null,
  // 로그인 토큰 정보
  userInfo: [],
  // 나의 정보
  otheruserInfo: [],
  //다른사람 정보
  followerList: [],
  //팔로워리스트
  followingList: [],
  //팔로잉리스트
  profileimagePaths: 'undefiend',
  userinfoLoading: false,
  //내정보로딩
  userinfoDone: false,
  //내정보로딩완료
  userinfoError: null,
  followLoading: false,
  //팔로우시도중
  followInError: '',
  //팔로우실패이유
  followDone: false,
  //팔로우완료
  unfollowLoading: false,
  //언팔로우시도중
  unfollowInError: '',
  //언팔로우실패이유
  unfollowDone: false,
  //언팔로우완료
  followInfo: [],
  //팔로우당하는사람정보
  followerLoading: false,
  //팔로워리스트로딩
  followerDone: false,
  //팔로워리스트완료
  followerInError: '',
  //팔로워리스트에러
  followingLoading: false,
  //팔로잉리스트로딩
  followingDone: false,
  //팔로잉리스트완료
  followingInError: '',
  //팔로잉리스트에러
  uploadProfileImagesLoading: false,
  uploadProfileImagesDone: false,
  uploadProfileImagesError: null
};
exports.initialState = initialState;
var USER_RESET = "USER_RESET";
exports.USER_RESET = USER_RESET;
var SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
exports.SIGN_UP_REQUEST = SIGN_UP_REQUEST;
var SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
exports.SIGN_UP_SUCCESS = SIGN_UP_SUCCESS;
var SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
exports.SIGN_UP_FAILURE = SIGN_UP_FAILURE;
var LOG_IN_REQUEST = 'LOG_IN_REQUEST';
exports.LOG_IN_REQUEST = LOG_IN_REQUEST;
var LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
exports.LOG_IN_SUCCESS = LOG_IN_SUCCESS;
var LOG_IN_FAILURE = 'LOG_IN_FAILURE';
exports.LOG_IN_FAILURE = LOG_IN_FAILURE;
var LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
exports.LOG_OUT_REQUEST = LOG_OUT_REQUEST;
var LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
exports.LOG_OUT_SUCCESS = LOG_OUT_SUCCESS;
var LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
exports.LOG_OUT_FAILURE = LOG_OUT_FAILURE;
var USER_INFO_REQUEST = 'USER_INFO_REQUEST';
exports.USER_INFO_REQUEST = USER_INFO_REQUEST;
var USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
exports.USER_INFO_SUCCESS = USER_INFO_SUCCESS;
var USER_INFO_FAILURE = 'USER_INFO_FAILURE';
exports.USER_INFO_FAILURE = USER_INFO_FAILURE;
var UPLOAD_PROFILE_IMAGES_REQUEST = 'UPLOAD_PROFILE_IMAGES_REQUEST';
exports.UPLOAD_PROFILE_IMAGES_REQUEST = UPLOAD_PROFILE_IMAGES_REQUEST;
var UPLOAD_PROFILE_IMAGES_SUCCESS = 'UPLOAD_PROFILE_IMAGES_SUCCESS';
exports.UPLOAD_PROFILE_IMAGES_SUCCESS = UPLOAD_PROFILE_IMAGES_SUCCESS;
var UPLOAD_PROFILE_IMAGES_FAILURE = 'UPLOAD_PROFILE_IMAGES_FAILURE'; //팔로우

exports.UPLOAD_PROFILE_IMAGES_FAILURE = UPLOAD_PROFILE_IMAGES_FAILURE;
var FOLLOW_REQUEST = 'FOLLOW_REQUEST';
exports.FOLLOW_REQUEST = FOLLOW_REQUEST;
var FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
exports.FOLLOW_SUCCESS = FOLLOW_SUCCESS;
var FOLLOW_FAILURE = 'FOLLOW_FAILURE'; //팔로우캔슬

exports.FOLLOW_FAILURE = FOLLOW_FAILURE;
var FOLLOW_CANCLE_REQUEST = 'FOLLOW_CANCLE_REQUEST';
exports.FOLLOW_CANCLE_REQUEST = FOLLOW_CANCLE_REQUEST;
var FOLLOW_CANCLE_SUCCESS = 'FOLLOW_CANCLE_SUCCESS';
exports.FOLLOW_CANCLE_SUCCESS = FOLLOW_CANCLE_SUCCESS;
var FOLLOW_CANCLE_FAILURE = 'FOLLOW_CANCLE_FAILURE'; //팔로워 리스트

exports.FOLLOW_CANCLE_FAILURE = FOLLOW_CANCLE_FAILURE;
var FOLLOWER_LIST_REQUEST = 'FOLLOWER_LIST_REQUEST';
exports.FOLLOWER_LIST_REQUEST = FOLLOWER_LIST_REQUEST;
var FOLLOWER_LIST_SUCCESS = 'FOLLOWER_LIST_SUCCESS';
exports.FOLLOWER_LIST_SUCCESS = FOLLOWER_LIST_SUCCESS;
var FOLLOWER_LIST_FAILURE = 'FOLLOWER_LIST_FAILURE'; //팔로잉 리스트

exports.FOLLOWER_LIST_FAILURE = FOLLOWER_LIST_FAILURE;
var FOLLOWING_LIST_REQUEST = 'FOLLOWING_LIST_REQUEST';
exports.FOLLOWING_LIST_REQUEST = FOLLOWING_LIST_REQUEST;
var FOLLOWING_LIST_SUCCESS = 'FOLLOWING_LIST_SUCCESS';
exports.FOLLOWING_LIST_SUCCESS = FOLLOWING_LIST_SUCCESS;
var FOLLOWING_LIST_FAILURE = 'FOLLOWING_LIST_FAILURE'; //다른사람 유저정보

exports.FOLLOWING_LIST_FAILURE = FOLLOWING_LIST_FAILURE;
var OTHER_USER_INFO_REQUEST = 'OTHER_USER_INFO_REQUEST';
exports.OTHER_USER_INFO_REQUEST = OTHER_USER_INFO_REQUEST;
var OTHER_USER_INFO_SUCCESS = 'OTHER_USER_INFO_SUCCESS';
exports.OTHER_USER_INFO_SUCCESS = OTHER_USER_INFO_SUCCESS;
var OTHER_USER_INFO_FAILURE = 'OTHER_USER_INFO_FAILURE';
exports.OTHER_USER_INFO_FAILURE = OTHER_USER_INFO_FAILURE;

var loginRequestAction = function loginRequestAction(data) {
  return {
    type: LOG_IN_REQUEST,
    data: data
  };
};

exports.loginRequestAction = loginRequestAction;

var logoutRequestAction = function logoutRequestAction(data) {
  return {
    type: LOG_OUT_REQUEST,
    data: data
  };
};

exports.logoutRequestAction = logoutRequestAction;

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _produce["default"])(state, function (draft) {
    switch (action.type) {
      case USER_RESET:
        draft.signUpDone = false;
        break;

      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;

      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data.jwt;
        draft.logInDone = true;
        break;

      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;

      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;

      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error.response.data;
        break;

      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;

      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        draft.userInfo = [];
        break;

      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case USER_INFO_REQUEST:
        draft.userinfoLoading = true;
        draft.userinfoDone = false;
        break;

      case USER_INFO_SUCCESS:
        draft.userinfoDone = true;
        draft.userinfoLoading = false;
        draft.userInfo = action.data;
        console.log(action.data);
        break;

      case USER_INFO_FAILURE:
        draft.userinfoDone = true;
        draft.userinfoLoading = false;
        draft.userinfoError = action.error.response.data;
        break;

      case UPLOAD_PROFILE_IMAGES_REQUEST:
        draft.uploadProfileImagesLoading = true;
        draft.uploadProfileImagesDone = false;
        draft.uploadProfileImagesError = null;
        break;

      case UPLOAD_PROFILE_IMAGES_SUCCESS:
        {
          draft.userInfo.profileImage = action.data;
          draft.uploadProfileImagesLoading = false;
          draft.uploadProfileImagesDone = true;
          break;
        }

      case UPLOAD_PROFILE_IMAGES_FAILURE:
        draft.uploadProfileImagesLoading = false;
        draft.uploadProfileImagesError = action.error;
        break;

      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true; //draft.otheruserInfo.followInfo = draft.followInfo.concat(action.data.userkey);
        //draft.userInfo.followlist = draft.userInfo.followlist.filter(f=>f.fromUser.id !== action.data.userkey)

        console.log("action.data.userkey" + action.data.userkey);
        draft.userInfo.followlist.push({
          fromUser: {
            id: action.data.userkey
          }
        }); //draft.me.Followings.push({ id: action.data.UserId });

        draft.userInfo.followlistsize = draft.userInfo.followlistsize + 1;
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followInError = action.error;
        break;

      case FOLLOW_CANCLE_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        break;

      case FOLLOW_CANCLE_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true; //draft.followInfo.splice(0,draft.followInfo.length)
        //draft.followInfo = draft.followInfo.concat(action.data);
        //console.log(action.data)
        //console.log(state.userInfo.followlist)
        //console.log(state.userInfo.followlist.map(v=>v).filter(f=>f.toUser.id ,action.data.userKey))

        console.log(action.data);
        draft.userInfo.followlist = draft.userInfo.followlist.filter(function (f) {
          return f.fromUser.id !== action.data.userkey;
        });
        draft.userInfo.followlistsize = draft.userInfo.followlistsize - 1;
        break;

      case FOLLOW_CANCLE_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowInError = action.error;
        break;

      case FOLLOWER_LIST_REQUEST:
        draft.followerDone = false;
        draft.followerLoading = true;
        break;

      case FOLLOWER_LIST_SUCCESS:
        draft.followerLoading = false;
        draft.followerDone = true;
        draft.followerList = action.data; // draft.followInfo = action.data.map((item)=>item.fromUser);

        break;

      case FOLLOWER_LIST_FAILURE:
        draft.followerInError = action.error;
        draft.followerLoading = false;
        draft.followerDone = true;
        break;

      case FOLLOWING_LIST_REQUEST:
        draft.followingLoading = true;
        draft.followingDone = false;
        break;

      case FOLLOWING_LIST_SUCCESS:
        draft.followingLoading = false;
        draft.followingDone = true;
        draft.followingList = action.data; // draft.followInfo = action.data.map((item)=>item.toUser);

        break;

      case FOLLOWING_LIST_FAILURE:
        draft.followingLoading = false;
        draft.followingDone = true;
        draft.followingInError = action.error;
        break;

      case OTHER_USER_INFO_REQUEST:
        draft.userinfoLoading = true;
        draft.userinfoDone = false;
        break;

      case OTHER_USER_INFO_SUCCESS:
        draft.userinfoDone = true;
        draft.userinfoLoading = false;
        draft.otheruserInfo = action.data;
        break;

      case OTHER_USER_INFO_FAILURE:
        draft.userinfoDone = true;
        draft.userinfoLoading = false;
        draft.userinfoError = action.error.response.data;
        break;

      default:
        break;
    }
  });
};

var _default = userReducer;
exports["default"] = _default;