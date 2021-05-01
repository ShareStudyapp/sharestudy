import produce from '../utils/produce';

export const initialState = {
  mainPosts: [],
  profilePosts: [],
  gallary: [],
  imagePaths: [],
  imagePath: [],
  postComment: [],
  postDetail: {},
  likeList: [],
  hasMorePosts: true,
  hasMoreComments: true,
  hasMoreProfilePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostDetailLoading: false,
  loadPostDetailDone: false,
  loadPostDetailError: null,
  loadPostsCommentLoading: false,
  loadPostsCommentDone: false,
  loadPostsCommentError: null,
  loadProfilePostsLoading: false,
  loadProfilePostsDone: false,
  loadProfilePostsError: null,
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
  unlikePostError: null,
  likeCommentLoading: false,
  likeCommentDone: false,
  likeCommentError: null,
  unlikeCommentLoading: false,
  unlikeCommentDone: false,
  unlikeCommentError: null
};

//피드 조회
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const LOAD_POSTS_CLEAR = 'LOAD_POSTS_CLEAR';

//프로필 피드 조회
export const LOAD_PROFILE_POSTS_REQUEST = 'LOAD_PROFILE_POSTS_REQUEST';
export const LOAD_PROFILE_POSTS_SUCCESS = 'LOAD_PROFILE_POSTS_SUCCESS';
export const LOAD_PROFILE_POSTS_FAILURE = 'LOAD_PROFILE_POSTS_FAILURE';
export const LOAD_PROFILE_POSTS_CLEAR = 'LOAD_PROFILE_POSTS_CLEAR';

//피드 디테일 조회
export const LOAD_POSTS_DETAIL_REQUEST = 'LOAD_POSTS_DETAIL_REQUEST';
export const LOAD_POSTS_DETAIL_SUCCESS = 'LOAD_POSTS_DETAIL_SUCCESS';
export const LOAD_POSTS_DETAIL_FAILURE = 'LOAD_POSTS_DETAIL_FAILURE';
export const LOAD_POSTS_DETAIL_CLEAR = 'LOAD_POSTS_DETAIL_CLEAR';

//피드 댓글 조회
export const LOAD_POSTS_COMMENT_REQUEST = 'LOAD_POSTS_COMMENT_REQUEST';
export const LOAD_POSTS_COMMENT_SUCCESS = 'LOAD_POSTS_COMMENT_SUCCESS';
export const LOAD_POSTS_COMMENT_FAILURE = 'LOAD_POSTS_COMMENT_FAILURE';
//갤러리 조회
export const LOAD_GALLARY_REQUEST = 'LOAD_GALLARY_REQUEST';
export const LOAD_GALLARY_SUCCESS = 'LOAD_GALLARY_SUCCESS';
export const LOAD_GALLARY_FAILURE = 'LOAD_GALLARY_FAILURE';
//이미지 추가
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
//첨부한이미지 삭제
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
//피드추가
export const INIT_ADD_POST = 'INIT_ADD_POST';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
//피드삭제
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const REMOVE_POST_CLEAR = 'REMOVE_POST_CLEAR';
//피드수정
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
export const UPDATE_POST_CLEAR = 'UPDATE_POST_CLEAR';
//피드좋아요
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
//피드좋아요취소
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';
//피드에 좋아요리스트조회
export const LIKE_LIST_REQUEST = 'LIKE_LIST_REQUEST';
export const LIKE_LIST_SUCCESS = 'LIKE_LIST_SUCCESS';
export const LIKE_LIST_FAILURE = 'LIKE_LIST_FAILURE';
//댓글추가
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
//댓글삭제
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';
export const REMOVE_COMMENT_CLEAR = 'REMOVE_COMMENT_CLEAR';
//댓글수정
export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';
export const UPDATE_COMMENT_CLEAR = 'UPDATE_COMMENT_CLEAR';
//댓글좋아요
export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';
//댓글좋아요취소
export const UNLIKE_COMMENT_REQUEST = 'UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'UNLIKE_COMMENT_FAILURE';

//대댓글추가
export const ADD_RECOMMENT_REQUEST = 'ADD_RECOMMENT_REQUEST';
export const ADD_RECOMMENT_SUCCESS = 'ADD_RECOMMENT_SUCCESS';
export const ADD_RECOMMENT_FAILURE = 'ADD_RECOMMENT_FAILURE';

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const postReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case LOAD_POSTS_CLEAR:
        draft.mainPosts = [];
        break;
      case LOAD_PROFILE_POSTS_REQUEST:
        draft.loadProfilePostsLoading = true;
        draft.loadProfilePostsDone = false;
        draft.loadProfilePostsError = null;
        break;
      case LOAD_PROFILE_POSTS_SUCCESS:
        draft.loadProfilePostsLoading = false;
        draft.loadProfilePostsDone = true;
        draft.profilePosts = draft.profilePosts.concat(action.data);
        draft.hasMoreProfilePosts = action.data.length === 10;
        break;
      case LOAD_PROFILE_POSTS_FAILURE:
        draft.loadProfilePostsLoading = false;
        draft.loadProfilePostsError = action.error;
        break;
      case LOAD_PROFILE_POSTS_CLEAR:
        draft.profilePosts = [];
        break;
      case LOAD_POSTS_DETAIL_REQUEST:
        draft.loadPostDetailLoading = true;
        draft.loadPostDetailDone = false;
        draft.loadPostDetailError = null;
        break;
      case LOAD_POSTS_DETAIL_SUCCESS:
        draft.loadPostDetailLoading = false;
        draft.loadPostDetailDone = true;
        draft.postDetail = action.data;
        break;
      case LOAD_POSTS_DETAIL_FAILURE:
        draft.loadPostDetailLoading = false;
        draft.loadPostDetailError = action.error;
        break;
      case LOAD_POSTS_DETAIL_CLEAR:
        draft.postDetail = {};
        break;
      case LOAD_POSTS_COMMENT_REQUEST:
        draft.loadPostsCommentLoading = true;
        draft.loadPostsCommentDone = false;
        draft.loadPostsCommentError = null;
        break;
      case LOAD_POSTS_COMMENT_SUCCESS:
        draft.loadPostsCommentLoading = false;
        draft.loadPostsCommentDone = true;
        if (draft.postDetail.feedreply) {
          draft.postDetail.feedreply = draft.postDetail.feedreply.concat(action.data.list);
        } else {
          draft.postDetail.feedreply = action.data.list;
        }
        draft.hasMoreComments = action.data.list.length === 10;
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
      case UPLOAD_IMAGES_SUCCESS: {
        const imagelist = action.data.join();
        const imageone = imagelist.split(',');
        for (const i in imageone) {
          draft.imagePaths.push(imageone[i]);
        }
        draft.imagePath = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
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
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case REMOVE_POST_CLEAR:
        draft.removePostLoading = false;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;

        draft.mainPosts.find((v) => v.id === action.data.id).content = action.data.content;
        draft.mainPosts.find((v) => v.id === action.data.id).uploadfile = action.data.uploadfile;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;
      case UPDATE_POST_CLEAR:
        draft.updatePostLoading = false;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.id);
        post.totallike = action.data.totallike;
        post.myFeedlike = action.data.myFeedlike;
        draft.postDetail.totallike = action.data.totallike;
        draft.postDetail.myFeedlike = action.data.myFeedlike;

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
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.id);
        post.totallike = action.data.totallike;
        post.myFeedlike = action.data.myFeedlike;
        draft.postDetail.totallike = action.data.totallike;
        draft.postDetail.myFeedlike = action.data.myFeedlike;
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
        const addComment = draft.mainPosts.find((v) => v.id === action.data.feedId);
        let size = draft.postDetail.feedreply.unshift(action.data);
        draft.postDetail.feedreplysize = size;
        if (addComment) addComment.feedreplysize = size;

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
        const feed = draft.mainPosts.find((v) => v.id === action.data.postId);

        draft.postDetail.feedreply = draft.postDetail.feedreply.filter(
          (v) => v.id !== action.data.commentId
        );
        draft.postDetail.feedreplysize = draft.postDetail.feedreply.length;
        if (feed) {
          feed.feedreplysize = draft.postDetail.feedreply.length;
        }

        break;
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      case REMOVE_COMMENT_CLEAR:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentLoading = true;
        draft.updateCommentDone = false;
        draft.updateCommentError = null;
        break;
      case UPDATE_COMMENT_SUCCESS:
        draft.updateCommentLoading = false;
        draft.updateCommentDone = true;
        const updateComment = draft.postDetail.feedreply.find((v) => v.id === action.data.id);
        updateComment.content = action.data.content;
        break;
      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        break;
      case LIKE_COMMENT_REQUEST:
        draft.likeCOMMENTLoading = true;
        draft.likeCOMMENTDone = false;
        draft.likeCOMMENTError = null;
        break;
      case LIKE_COMMENT_SUCCESS: {
        const comment = draft.postDetail.feedreply.find((v) => v.id === action.data.replyId);
        comment.likeCnt = comment.likeCnt + 1;
        comment.myFeedReplyLike = [action.data];
        // comment.myFeedlike = action.data.myFeedlike;
        // draft.Commentetail.totallike = action.data.totallike;
        // draft.Commentetail.myFeedlike = action.data.myFeedlike;

        draft.likeCommentLoading = false;
        draft.likeCommentDone = true;
        break;
      }
      case LIKE_COMMENT_FAILURE:
        draft.likeCommentLoading = false;
        draft.likeCommentError = action.error;
        break;
      case UNLIKE_COMMENT_REQUEST:
        draft.unlikeCommentLoading = true;
        draft.unlikeCommentDone = false;
        draft.unlikeCommentError = null;
        break;
      case UNLIKE_COMMENT_SUCCESS: {
        const comment = draft.postDetail.feedreply.find((v) => v.id === action.data.replyId);
        comment.likeCnt = comment.likeCnt - 1;
        comment.myFeedReplyLike = [];
        draft.unlikeCommentLoading = false;
        draft.unlikeCommentDone = true;
        break;
      }
      case UNLIKE_COMMENT_FAILURE:
        draft.unlikeCommentLoading = false;
        draft.unlikeCommentError = action.error;
        break;
      case ADD_RECOMMENT_REQUEST:
        draft.addRecommentLoading = true;
        draft.addRecommentDone = false;
        draft.addRecommentError = null;
        break;
      case ADD_RECOMMENT_SUCCESS:
        //const addReComment = draft.postDetail.feedreply.find((v) => v.id === action.data.feedId);
        draft.addRecommentLoading = false;
        draft.addRecommentDone = true;
        break;
      case ADD_RECOMMENT_FAILURE:
        draft.addRecommentLoading = false;
        draft.addRecommentError = action.error;
        break;
      default:
        break;
    }
  });

export default postReducer;
