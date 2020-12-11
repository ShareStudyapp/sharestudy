"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.addComment = exports.UPDATE_COMMENT_FAILURE = exports.UPDATE_COMMENT_SUCCESS = exports.UPDATE_COMMENT_REQUEST = exports.REMOVE_COMMENT_FAILURE = exports.REMOVE_COMMENT_SUCCESS = exports.REMOVE_COMMENT_REQUEST = exports.ADD_COMMENT_FAILURE = exports.ADD_COMMENT_SUCCESS = exports.ADD_COMMENT_REQUEST = exports.LIKE_LIST_FAILURE = exports.LIKE_LIST_SUCCESS = exports.LIKE_LIST_REQUEST = exports.UNLIKE_POST_FAILURE = exports.UNLIKE_POST_SUCCESS = exports.UNLIKE_POST_REQUEST = exports.LIKE_POST_FAILURE = exports.LIKE_POST_SUCCESS = exports.LIKE_POST_REQUEST = exports.UPDATE_POST_FAILURE = exports.UPDATE_POST_SUCCESS = exports.UPDATE_POST_REQUEST = exports.REMOVE_POST_FAILURE = exports.REMOVE_POST_SUCCESS = exports.REMOVE_POST_REQUEST = exports.ADD_POST_FAILURE = exports.ADD_POST_SUCCESS = exports.ADD_POST_REQUEST = exports.INIT_ADD_POST = exports.REMOVE_IMAGE = exports.UPLOAD_IMAGES_FAILURE = exports.UPLOAD_IMAGES_SUCCESS = exports.UPLOAD_IMAGES_REQUEST = exports.LOAD_GALLARY_FAILURE = exports.LOAD_GALLARY_SUCCESS = exports.LOAD_GALLARY_REQUEST = exports.LOAD_POSTS_COMMENT_FAILURE = exports.LOAD_POSTS_COMMENT_SUCCESS = exports.LOAD_POSTS_COMMENT_REQUEST = exports.LOAD_POSTS_DETAIL_FAILURE = exports.LOAD_POSTS_DETAIL_SUCCESS = exports.LOAD_POSTS_DETAIL_REQUEST = exports.LOAD_POSTS_FAILURE = exports.LOAD_POSTS_SUCCESS = exports.LOAD_POSTS_REQUEST = exports.initialState = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _produce = _interopRequireDefault(require("../utils/produce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  mainPosts: [],
  gallary: [],
  imagePaths: [],
  postComment: [],
  likeList: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostsCommentLoading: false,
  loadPostsCommentDone: false,
  loadPostsCommentError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  LikelistLoading: false,
  LikelistDone: false,
  LikelistError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null
}; //피드 조회

exports.initialState = initialState;
var LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
exports.LOAD_POSTS_REQUEST = LOAD_POSTS_REQUEST;
var LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
exports.LOAD_POSTS_SUCCESS = LOAD_POSTS_SUCCESS;
var LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'; //피드 디테일 조회

exports.LOAD_POSTS_FAILURE = LOAD_POSTS_FAILURE;
var LOAD_POSTS_DETAIL_REQUEST = 'LOAD_POSTS_DETAIL_REQUEST';
exports.LOAD_POSTS_DETAIL_REQUEST = LOAD_POSTS_DETAIL_REQUEST;
var LOAD_POSTS_DETAIL_SUCCESS = 'LOAD_POSTS_DETAIL_SUCCESS';
exports.LOAD_POSTS_DETAIL_SUCCESS = LOAD_POSTS_DETAIL_SUCCESS;
var LOAD_POSTS_DETAIL_FAILURE = 'LOAD_POSTS_DETAIL_FAILURE'; //피드 댓글 조회

exports.LOAD_POSTS_DETAIL_FAILURE = LOAD_POSTS_DETAIL_FAILURE;
var LOAD_POSTS_COMMENT_REQUEST = 'LOAD_POSTS_COMMENT_REQUEST';
exports.LOAD_POSTS_COMMENT_REQUEST = LOAD_POSTS_COMMENT_REQUEST;
var LOAD_POSTS_COMMENT_SUCCESS = 'LOAD_POSTS_COMMENT_SUCCESS';
exports.LOAD_POSTS_COMMENT_SUCCESS = LOAD_POSTS_COMMENT_SUCCESS;
var LOAD_POSTS_COMMENT_FAILURE = 'LOAD_POSTS_COMMENT_FAILURE'; //갤러리 조회

exports.LOAD_POSTS_COMMENT_FAILURE = LOAD_POSTS_COMMENT_FAILURE;
var LOAD_GALLARY_REQUEST = 'LOAD_GALLARY_REQUEST';
exports.LOAD_GALLARY_REQUEST = LOAD_GALLARY_REQUEST;
var LOAD_GALLARY_SUCCESS = 'LOAD_GALLARY_SUCCESS';
exports.LOAD_GALLARY_SUCCESS = LOAD_GALLARY_SUCCESS;
var LOAD_GALLARY_FAILURE = 'LOAD_GALLARY_FAILURE'; //이미지 추가

exports.LOAD_GALLARY_FAILURE = LOAD_GALLARY_FAILURE;
var UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
exports.UPLOAD_IMAGES_REQUEST = UPLOAD_IMAGES_REQUEST;
var UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
exports.UPLOAD_IMAGES_SUCCESS = UPLOAD_IMAGES_SUCCESS;
var UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE'; //첨부한이미지 삭제

exports.UPLOAD_IMAGES_FAILURE = UPLOAD_IMAGES_FAILURE;
var REMOVE_IMAGE = 'REMOVE_IMAGE'; //피드추가

exports.REMOVE_IMAGE = REMOVE_IMAGE;
var INIT_ADD_POST = 'INIT_ADD_POST';
exports.INIT_ADD_POST = INIT_ADD_POST;
var ADD_POST_REQUEST = 'ADD_POST_REQUEST';
exports.ADD_POST_REQUEST = ADD_POST_REQUEST;
var ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
exports.ADD_POST_SUCCESS = ADD_POST_SUCCESS;
var ADD_POST_FAILURE = 'ADD_POST_FAILURE'; //피드삭제

exports.ADD_POST_FAILURE = ADD_POST_FAILURE;
var REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
exports.REMOVE_POST_REQUEST = REMOVE_POST_REQUEST;
var REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
exports.REMOVE_POST_SUCCESS = REMOVE_POST_SUCCESS;
var REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'; //피드수정

exports.REMOVE_POST_FAILURE = REMOVE_POST_FAILURE;
var UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
exports.UPDATE_POST_REQUEST = UPDATE_POST_REQUEST;
var UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
exports.UPDATE_POST_SUCCESS = UPDATE_POST_SUCCESS;
var UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE'; //피드좋아요

exports.UPDATE_POST_FAILURE = UPDATE_POST_FAILURE;
var LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
exports.LIKE_POST_REQUEST = LIKE_POST_REQUEST;
var LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
exports.LIKE_POST_SUCCESS = LIKE_POST_SUCCESS;
var LIKE_POST_FAILURE = 'LIKE_POST_FAILURE'; //피드좋아요취소

exports.LIKE_POST_FAILURE = LIKE_POST_FAILURE;
var UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
exports.UNLIKE_POST_REQUEST = UNLIKE_POST_REQUEST;
var UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
exports.UNLIKE_POST_SUCCESS = UNLIKE_POST_SUCCESS;
var UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE'; //피드에 좋아요리스트조회

exports.UNLIKE_POST_FAILURE = UNLIKE_POST_FAILURE;
var LIKE_LIST_REQUEST = 'LIKE_LIST_REQUEST';
exports.LIKE_LIST_REQUEST = LIKE_LIST_REQUEST;
var LIKE_LIST_SUCCESS = 'LIKE_LIST_SUCCESS';
exports.LIKE_LIST_SUCCESS = LIKE_LIST_SUCCESS;
var LIKE_LIST_FAILURE = 'LIKE_LIST_FAILURE'; //댓글추가

exports.LIKE_LIST_FAILURE = LIKE_LIST_FAILURE;
var ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
exports.ADD_COMMENT_REQUEST = ADD_COMMENT_REQUEST;
var ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
exports.ADD_COMMENT_SUCCESS = ADD_COMMENT_SUCCESS;
var ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'; //댓글삭제

exports.ADD_COMMENT_FAILURE = ADD_COMMENT_FAILURE;
var REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
exports.REMOVE_COMMENT_REQUEST = REMOVE_COMMENT_REQUEST;
var REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
exports.REMOVE_COMMENT_SUCCESS = REMOVE_COMMENT_SUCCESS;
var REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE'; //댓글수정 

exports.REMOVE_COMMENT_FAILURE = REMOVE_COMMENT_FAILURE;
var UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
exports.UPDATE_COMMENT_REQUEST = UPDATE_COMMENT_REQUEST;
var UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
exports.UPDATE_COMMENT_SUCCESS = UPDATE_COMMENT_SUCCESS;
var UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';
exports.UPDATE_COMMENT_FAILURE = UPDATE_COMMENT_FAILURE;

var addComment = function addComment(data) {
  return {
    type: ADD_COMMENT_REQUEST,
    data: data
  };
}; // 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)


exports.addComment = addComment;

var postReducer = function postReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _produce["default"])(state, function (draft) {
    // const templist = [];
    // templist.push(action.data);
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true; //draft.mainPosts = action.data.concat(draft.mainPosts);

        draft.mainPosts = action.data;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;

      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case LOAD_POSTS_DETAIL_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_POSTS_DETAIL_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.postComment = action.data;
        break;

      case LOAD_POSTS_DETAIL_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case LOAD_POSTS_COMMENT_REQUEST:
        draft.loadPostsCommentLoading = true;
        draft.loadPostsCommentDone = false;
        draft.loadPostsCommentError = null; //draft.mainPosts.feed = [];

        break;

      case LOAD_POSTS_COMMENT_SUCCESS:
        //const c = draft.mainPosts.find((v) => v.id===action.feedkey);
        draft.loadPostsCommentLoading = false;
        draft.loadPostsCommentDone = true; //draft.mainPosts = draft.mainPosts.find((v) => v.id===action.data.feedlist.id).feedreply.push(action.data.feedReplylist);
        //const c = draft.mainPosts.find((v) => v.id===action.data.feedlist.id);
        //action.data.feedReplylist.map((item)=>c.feedreply.push(item));

        draft.mainPosts.find(function (v) {
          return v.id === action.data.feedlist.id;
        }).feedreply = action.data.feedReplylist; // draft.postComment = draft.postComment.concat(action.data);
        // draft.mainPosts = c.concat(draft.postComment)
        //draft.hasMorePosts = draft.mainPosts.length < 50;

        break;

      case LOAD_POSTS_COMMENT_FAILURE:
        draft.loadPostsCommentLoading = false;
        draft.loadPostsCommentError = action.error;
        break;

      case LOAD_GALLARY_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_GALLARY_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.gallary = action.data.concat(draft.gallary);
        draft.hasMorePosts = draft.gallary.length < 50;
        break;

      case LOAD_GALLARY_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;

      case UPLOAD_IMAGES_SUCCESS:
        {
          var imagelist = action.data.join();
          var imageone = imagelist.split(',');

          for (var i in imageone) {
            draft.imagePaths.push(imageone[i]);
          }

          draft.uploadImagesLoading = false;
          draft.uploadImagesDone = true;
          break;
        }

      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter(function (v, i) {
          return i !== action.data;
        });
        break;

      case INIT_ADD_POST:
        draft.addPostDone = false;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;

      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(function (v) {
          return v.id !== action.data;
        });
        break;

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;

      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.mainPosts.find(function (v) {
          return v.id === action.data.id;
        }).content = action.data.content;
        break;

      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;

      case LIKE_POST_SUCCESS:
        {
          var post = draft.mainPosts.find(function (v) {
            return v.id === action.data.id;
          });
          post.feedlike.push({
            userkey: action.data.userKey
          });
          draft.mainPosts.find(function (v) {
            return v.id === action.data.id;
          }).totallike = action.data.totallike;
          draft.likePostLoading = false;
          draft.likePostDone = true;
          break;
        }

      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;

      case UNLIKE_POST_SUCCESS:
        {
          var _post = draft.mainPosts.find(function (v) {
            return v.id === action.data.id;
          });

          _post.feedlike = _post.feedlike.filter(function (v) {
            return v.userkey !== action.data.userKey;
          });
          draft.mainPosts.find(function (v) {
            return v.id === action.data.id;
          }).totallike = action.data.totallike;
          draft.unlikePostLoading = false;
          draft.unlikePostDone = true;
          break;
        }

      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      case LIKE_LIST_REQUEST:
        draft.LikelistLoading = true;
        draft.LikelistDone = false;
        draft.LikelistError = null;
        break;

      case LIKE_LIST_SUCCESS:
        draft.LikelistLoading = false;
        draft.LikelistDone = true;
        draft.likeList = action.data;
        break;

      case LIKE_LIST_FAILURE:
        draft.LikelistLoading = false;
        draft.LikelistError = null;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;

      case ADD_COMMENT_SUCCESS:
        var _addComment = draft.mainPosts.find(function (v) {
          return v.id === action.data.feedlistkey;
        });

        _addComment.feedreply.unshift(action.data);

        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;

      case REMOVE_COMMENT_SUCCESS:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        var removeComment = draft.mainPosts.find(function (v) {
          return v.id === action.data.postId;
        });
        removeComment.feedreply = removeComment.feedreply.filter(function (item) {
          return item.id !== action.data.commentId;
        }); //const removepostlist = state.mainPosts.find((v) => v.id === action.data.postId);
        // console.log(state.mainPosts.map((item)=>item.feedreply))
        //draft.mainPosts= draft.mainPosts.feedreply.filter((v) => v.id !== action.data.commentId);

        break;

      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;

      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentLoading = true;
        draft.updateCommentDone = false;
        draft.updateCommentError = null;
        break;

      case UPDATE_COMMENT_SUCCESS:
        draft.updateCommentLoading = false;
        draft.updateCommentDone = true;
        console.log(action.data);
        var updateComment = draft.mainPosts.find(function (v) {
          return v.id === action.data.feedlistkey;
        });
        updateComment.feedreply.find(function (item) {
          return item.id === action.data.id;
        }).content = action.data.content; //draft.mainPosts.find((v) => v.id === action.data.id).content = action.data.content;
        //updatepostlist.find((v) => v.id === action.data.id).content = action.data.content;

        break;

      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

var _default = postReducer;
exports["default"] = _default;