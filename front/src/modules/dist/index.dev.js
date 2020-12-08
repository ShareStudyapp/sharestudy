"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootSaga = rootSaga;
exports["default"] = void 0;

var _redux = require("redux");

var _effects = require("redux-saga/effects");

var _user = _interopRequireDefault(require("../sagas/user"));

var _post = _interopRequireDefault(require("../sagas/post"));

var _todolist = _interopRequireDefault(require("../sagas/todolist"));

var _user2 = _interopRequireDefault(require("../reducers/user"));

var _post2 = _interopRequireDefault(require("../reducers/post"));

var _todolist2 = _interopRequireDefault(require("../reducers/todolist"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);

_axios["default"].defaults.baseURL = 'http://localhost:8080'; // Add a request interceptor

_axios["default"].interceptors.request.use(function (config) {
  var token = window.sessionStorage.getItem('user');

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

var rootReducer = (0, _redux.combineReducers)({
  userReducer: _user2["default"],
  postReducer: _post2["default"],
  todolistReducer: _todolist2["default"]
});

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.all)([(0, _user["default"])(), (0, _post["default"])(), (0, _todolist["default"])()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _default = rootReducer;
exports["default"] = _default;