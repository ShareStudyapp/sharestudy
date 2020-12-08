"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = postSaga;

var _axios = _interopRequireDefault(require("axios"));

var _shortid = _interopRequireDefault(require("shortid"));

var _effects = require("redux-saga/effects");

var _index = _interopRequireDefault(require("../modules/index"));

var _post = require("../reducers/post");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(loadPosts),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(loadPostsComments),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(loadGallary),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(uploadImages),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(addPost),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(removePost),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(updatePost),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(likePost),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(unlikePost),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(addComment),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(removeComment),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(updateComment),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(likeListComment),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(loadPostDetail),
    _marked15 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLoadPosts),
    _marked16 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLoadPostsComments),
    _marked17 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLoadGallary),
    _marked18 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUploadImages),
    _marked19 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddPost),
    _marked20 =
/*#__PURE__*/
regeneratorRuntime.mark(watchRemovePost),
    _marked21 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdatePost),
    _marked22 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLikePost),
    _marked23 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUnlikePost),
    _marked24 =
/*#__PURE__*/
regeneratorRuntime.mark(watchAddComment),
    _marked25 =
/*#__PURE__*/
regeneratorRuntime.mark(watchRemoveComment),
    _marked26 =
/*#__PURE__*/
regeneratorRuntime.mark(watchUpdateComment),
    _marked27 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLikeListComments),
    _marked28 =
/*#__PURE__*/
regeneratorRuntime.mark(watchLoadPostDetail),
    _marked29 =
/*#__PURE__*/
regeneratorRuntime.mark(postSaga);

function loadPostsAPI(data) {
  console.log("data+", data);
  return _axios["default"].get('/feed', data);
}

function uploadImagesAPI(data) {
  return _axios["default"].post('/feed/upload', data);
}

function loadPosts(action) {
  var result;
  return regeneratorRuntime.wrap(function loadPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(loadPostsAPI, action.data);

        case 3:
          result = _context.sent;
          _context.next = 6;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_SUCCESS,
            data: result.data
          });

        case 6:
          _context.next = 13;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          _context.next = 13;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_FAILURE,
            data: _context.t0.response.data
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function loadPostsCommentsAPI(data) {
  return _axios["default"].get("/feed/reply/".concat(data.id));
}

function loadPostsComments(action) {
  var result;
  return regeneratorRuntime.wrap(function loadPostsComments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _effects.call)(loadPostsCommentsAPI, action.data);

        case 3:
          result = _context2.sent;
          _context2.next = 6;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_COMMENT_SUCCESS,
            data: result.data
          });

        case 6:
          _context2.next = 13;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          _context2.next = 13;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_COMMENT_FAILURE,
            data: _context2.t0.response.data
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 8]]);
}

function loadGallaryAPI(data) {
  return _axios["default"].get('/gallary', data);
}

function loadGallary(action) {
  var result;
  return regeneratorRuntime.wrap(function loadGallary$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _effects.call)(loadGallaryAPI, action.data);

        case 3:
          result = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)({
            type: _post.LOAD_GALLARY_SUCCESS,
            data: result.data
          });

        case 6:
          _context3.next = 13;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          _context3.next = 13;
          return (0, _effects.put)({
            type: _post.LOAD_GALLARY_FAILURE,
            data: _context3.t0.response.data
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 8]]);
}

function uploadImages(action) {
  var result;
  return regeneratorRuntime.wrap(function uploadImages$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _effects.call)(uploadImagesAPI, action.data);

        case 3:
          result = _context4.sent;
          _context4.next = 6;
          return (0, _effects.put)({
            type: _post.UPLOAD_IMAGES_SUCCESS,
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
            type: _post.UPLOAD_IMAGES_FAILURE,
            error: _context4.t0.response.data
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[0, 8]]);
}

function addPostAPI(data) {
  return _axios["default"].post('/feed', data);
}

function addPost(action) {
  var result;
  return regeneratorRuntime.wrap(function addPost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _effects.call)(addPostAPI, action.data);

        case 3:
          result = _context5.sent;
          _context5.next = 6;
          return (0, _effects.put)({
            type: _post.ADD_POST_SUCCESS,
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
            type: _post.ADD_POST_FAILURE,
            error: _context5.t0.response.data
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[0, 8]]);
}

function removePostAPI(id) {
  return _axios["default"]["delete"]("/feed/".concat(id));
}

function removePost(action) {
  var result;
  return regeneratorRuntime.wrap(function removePost$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return (0, _effects.call)(removePostAPI, action.data);

        case 3:
          result = _context6.sent;
          _context6.next = 6;
          return (0, _effects.put)({
            type: _post.REMOVE_POST_SUCCESS,
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
            type: _post.REMOVE_POST_FAILURE,
            error: _context6.t0.response.data
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[0, 8]]);
}

function updatePostAPI(data) {
  return _axios["default"].patch("/feed/".concat(data.id), data);
}

function updatePost(action) {
  var result;
  return regeneratorRuntime.wrap(function updatePost$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return (0, _effects.call)(updatePostAPI, action.data);

        case 3:
          result = _context7.sent;
          _context7.next = 6;
          return (0, _effects.put)({
            type: _post.UPDATE_POST_SUCCESS,
            data: result.data
          });

        case 6:
          _context7.next = 13;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          _context7.next = 13;
          return (0, _effects.put)({
            type: _post.UPDATE_POST_FAILURE,
            error: _context7.t0.response.data
          });

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[0, 8]]);
}

function likePostAPI(id) {
  return _axios["default"].post("/likefeed/".concat(id));
}

function likePost(action) {
  var result;
  return regeneratorRuntime.wrap(function likePost$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _effects.call)(likePostAPI, action.data);

        case 3:
          result = _context8.sent;
          _context8.next = 6;
          return (0, _effects.put)({
            type: _post.LIKE_POST_SUCCESS,
            data: result.data
          });

        case 6:
          _context8.next = 13;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          _context8.next = 13;
          return (0, _effects.put)({
            type: _post.LIKE_POST_FAILURE,
            error: _context8.t0.response.data
          });

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, null, [[0, 8]]);
}

function unlikePostAPI(id) {
  return _axios["default"]["delete"]("/likefeed/".concat(id));
}

function unlikePost(action) {
  var result;
  return regeneratorRuntime.wrap(function unlikePost$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return (0, _effects.call)(unlikePostAPI, action.data);

        case 3:
          result = _context9.sent;
          _context9.next = 6;
          return (0, _effects.put)({
            type: _post.UNLIKE_POST_SUCCESS,
            data: result.data
          });

        case 6:
          _context9.next = 13;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          _context9.next = 13;
          return (0, _effects.put)({
            type: _post.UNLIKE_POST_FAILURE,
            error: _context9.t0.response.data
          });

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, null, [[0, 8]]);
}

function addCommentAPI(data) {
  return _axios["default"].post("/feed/reply/".concat(data.id), data); // POST /post/1/comment
}

function addComment(action) {
  var result;
  return regeneratorRuntime.wrap(function addComment$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return (0, _effects.call)(addCommentAPI, action.data);

        case 3:
          result = _context10.sent;
          _context10.next = 6;
          return (0, _effects.put)({
            type: _post.ADD_COMMENT_SUCCESS,
            data: result.data
          });

        case 6:
          _context10.next = 13;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.error(_context10.t0);
          _context10.next = 13;
          return (0, _effects.put)({
            type: _post.ADD_COMMENT_FAILURE,
            error: _context10.t0.response.data
          });

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10, null, [[0, 8]]);
}

function removeCommentAPI(id) {
  return _axios["default"]["delete"]("/feed/reply/".concat(id));
}

function removeComment(action) {
  var result;
  return regeneratorRuntime.wrap(function removeComment$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _effects.call)(removeCommentAPI, action.data);

        case 3:
          result = _context11.sent;
          _context11.next = 6;
          return (0, _effects.put)({
            type: _post.REMOVE_COMMENT_SUCCESS,
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
            type: _post.REMOVE_COMMENT_FAILURE,
            error: _context11.t0.response.data
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, null, [[0, 8]]);
}

function updateCommentAPI(data) {
  return _axios["default"].patch("/feed/reply/".concat(data.id), data);
}

function updateComment(action) {
  var result;
  return regeneratorRuntime.wrap(function updateComment$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return (0, _effects.call)(updateCommentAPI, action.data);

        case 3:
          result = _context12.sent;
          _context12.next = 6;
          return (0, _effects.put)({
            type: _post.UPDATE_COMMENT_SUCCESS,
            data: result.data
          });

        case 6:
          _context12.next = 12;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);
          _context12.next = 12;
          return (0, _effects.put)({
            type: _post.UPDATE_COMMENT_FAILURE,
            error: _context12.t0.response.data
          });

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12, null, [[0, 8]]);
}

function loadLikeListAPI(id) {
  return _axios["default"].get("/feed/likefeedlist/".concat(id));
}

function likeListComment(action) {
  var result;
  return regeneratorRuntime.wrap(function likeListComment$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return (0, _effects.call)(loadLikeListAPI, action.data);

        case 3:
          result = _context13.sent;
          _context13.next = 6;
          return (0, _effects.put)({
            type: _post.LIKE_LIST_SUCCESS,
            data: result.data
          });

        case 6:
          _context13.next = 12;
          break;

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);
          _context13.next = 12;
          return (0, _effects.put)({
            type: _post.LIKE_LIST_FAILURE,
            error: _context13.t0.response.data
          });

        case 12:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13, null, [[0, 8]]);
}

function loadPostDetailAPI(id) {
  return _axios["default"].get("/feedDetail/".concat(id));
}

function loadPostDetail(action) {
  var result;
  return regeneratorRuntime.wrap(function loadPostDetail$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return (0, _effects.call)(loadPostDetailAPI, action.data);

        case 3:
          result = _context14.sent;
          _context14.next = 6;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_DETAIL_SUCCESS,
            data: result.data
          });

        case 6:
          _context14.next = 12;
          break;

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          _context14.next = 12;
          return (0, _effects.put)({
            type: _post.LOAD_POSTS_DETAIL_FAILURE,
            error: _context14.t0.response.data
          });

        case 12:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14, null, [[0, 8]]);
}

function watchLoadPosts() {
  return regeneratorRuntime.wrap(function watchLoadPosts$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _effects.takeLatest)(_post.LOAD_POSTS_REQUEST, loadPosts);

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15);
}

function watchLoadPostsComments() {
  return regeneratorRuntime.wrap(function watchLoadPostsComments$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.takeLatest)(_post.LOAD_POSTS_COMMENT_REQUEST, loadPostsComments);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked16);
}

function watchLoadGallary() {
  return regeneratorRuntime.wrap(function watchLoadGallary$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _effects.throttle)(5000, _post.LOAD_GALLARY_REQUEST, loadGallary);

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  }, _marked17);
}

function watchUploadImages() {
  return regeneratorRuntime.wrap(function watchUploadImages$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _effects.takeEvery)(_post.UPLOAD_IMAGES_REQUEST, uploadImages);

        case 2:
        case "end":
          return _context18.stop();
      }
    }
  }, _marked18);
}

function watchAddPost() {
  return regeneratorRuntime.wrap(function watchAddPost$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _effects.takeLatest)(_post.ADD_POST_REQUEST, addPost);

        case 2:
        case "end":
          return _context19.stop();
      }
    }
  }, _marked19);
}

function watchRemovePost() {
  return regeneratorRuntime.wrap(function watchRemovePost$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return (0, _effects.takeLatest)(_post.REMOVE_POST_REQUEST, removePost);

        case 2:
        case "end":
          return _context20.stop();
      }
    }
  }, _marked20);
}

function watchUpdatePost() {
  return regeneratorRuntime.wrap(function watchUpdatePost$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return (0, _effects.takeLatest)(_post.UPDATE_POST_REQUEST, updatePost);

        case 2:
        case "end":
          return _context21.stop();
      }
    }
  }, _marked21);
}

function watchLikePost() {
  return regeneratorRuntime.wrap(function watchLikePost$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _effects.takeLatest)(_post.LIKE_POST_REQUEST, likePost);

        case 2:
        case "end":
          return _context22.stop();
      }
    }
  }, _marked22);
}

function watchUnlikePost() {
  return regeneratorRuntime.wrap(function watchUnlikePost$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return (0, _effects.takeLatest)(_post.UNLIKE_POST_REQUEST, unlikePost);

        case 2:
        case "end":
          return _context23.stop();
      }
    }
  }, _marked23);
}

function watchAddComment() {
  return regeneratorRuntime.wrap(function watchAddComment$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return (0, _effects.takeLatest)(_post.ADD_COMMENT_REQUEST, addComment);

        case 2:
        case "end":
          return _context24.stop();
      }
    }
  }, _marked24);
}

function watchRemoveComment() {
  return regeneratorRuntime.wrap(function watchRemoveComment$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return (0, _effects.takeLatest)(_post.REMOVE_COMMENT_REQUEST, removeComment);

        case 2:
        case "end":
          return _context25.stop();
      }
    }
  }, _marked25);
}

function watchUpdateComment() {
  return regeneratorRuntime.wrap(function watchUpdateComment$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return (0, _effects.takeLatest)(_post.UPDATE_COMMENT_REQUEST, updateComment);

        case 2:
        case "end":
          return _context26.stop();
      }
    }
  }, _marked26);
}

function watchLikeListComments() {
  return regeneratorRuntime.wrap(function watchLikeListComments$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return (0, _effects.takeLatest)(_post.LIKE_LIST_REQUEST, likeListComment);

        case 2:
        case "end":
          return _context27.stop();
      }
    }
  }, _marked27);
}

function watchLoadPostDetail() {
  return regeneratorRuntime.wrap(function watchLoadPostDetail$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return (0, _effects.takeLatest)(_post.LOAD_POSTS_DETAIL_REQUEST, loadPostDetail);

        case 2:
        case "end":
          return _context28.stop();
      }
    }
  }, _marked28);
}

function postSaga() {
  return regeneratorRuntime.wrap(function postSaga$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(watchLoadPosts), (0, _effects.fork)(watchLoadGallary), (0, _effects.fork)(watchUploadImages), (0, _effects.fork)(watchAddPost), (0, _effects.fork)(watchRemovePost), (0, _effects.fork)(watchUpdatePost), (0, _effects.fork)(watchLikePost), (0, _effects.fork)(watchUnlikePost), (0, _effects.fork)(watchAddComment), (0, _effects.fork)(watchRemoveComment), (0, _effects.fork)(watchUpdateComment), (0, _effects.fork)(watchLoadPostsComments), (0, _effects.fork)(watchLikeListComments), (0, _effects.fork)(watchLoadPostDetail)]);

        case 2:
        case "end":
          return _context29.stop();
      }
    }
  }, _marked29);
}