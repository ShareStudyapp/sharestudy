import produce from '../utils/produce';

export const initialState = {
  todo: {},
  loadTodoLoading: false,
  loadTodoDone: false,
  loadTodoError: null,
  addTodoLoading: false,
  addTodoDone: false,
  addTodoError: null,
  updateTodoLoading: false,
  updateTodoDone: false,
  updateTodoError: null,
  deleteTodoLoading: false,
  deleteTodoDone: false,
  deleteTodoError: null,
  addTodoCommentLoading: false,
  addTodoCommentDone: false,
  addTodoCommentError: null,
  updateTodoCommentLoading: false,
  updateTodoCommentDone: false,
  updateTodoCommentError: null,
  deleteTodoCommentLoading: false,
  deleteTodoCommentDone: false,
  deleteTodoCommentError: null
};

//투두조회
export const LOAD_TODO_REQUEST = 'LOAD_TODO_REQUEST';
export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';
export const LOAD_TODO_FAILURE = 'LOAD_TODO_FAILURE';

//투두추가
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';
export const ADD_TODO_INIT = 'ADD_TODO_INIT';

//투두삭제
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';
export const DELETE_TODO_INIT = 'DELETE_TODO_INIT';

//투두수정
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
export const UPDATE_TODO_INIT = 'UPDATE_TODO_INIT';

//코멘트추가
export const ADD_TODO_COMMENT_REQUEST = 'ADD_TODO_COMMENT_REQUEST';
export const ADD_TODO_COMMENT_SUCCESS = 'ADD_TODO_COMMENT_SUCCESS';
export const ADD_TODO_COMMENT_FAILURE = 'ADD_TODO_COMMENT_FAILURE';
export const ADD_TODO_COMMENT_INIT = 'ADD_TODO_COMMENT_INIT';

//코멘트삭제
export const DELETE_TODO_COMMENT_REQUEST = 'DELETE_TODO_COMMENT_REQUEST';
export const DELETE_TODO_COMMENT_SUCCESS = 'DELETE_TODO_COMMENT_SUCCESS';
export const DELETE_TODO_COMMENT_FAILURE = 'DELETE_TODO_COMMENT_FAILURE';
export const DELETE_TODO_COMMENT_INIT = 'DELETE_TODO_COMMENT_INIT';

//코멘트수정
export const UPDATE_TODO_COMMENT_REQUEST = 'UPDATE_TODO_COMMENT_REQUEST';
export const UPDATE_TODO_COMMENT_SUCCESS = 'UPDATE_TODO_COMMENT_SUCCESS';
export const UPDATE_TODO_COMMENT_FAILURE = 'UPDATE_TODO_COMMENT_FAILURE';
export const UPDATE_TODO_COMMENT_INIT = 'UPDATE_TODO_COMMENT_INIT';

const todoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_TODO_REQUEST:
        draft.addTodoLoading = true;
        draft.addTodoDone = false;
        draft.addTodoError = null;
        break;
      case ADD_TODO_SUCCESS:
        draft.addTodoLoading = false;
        draft.addTodoDone = true;
        draft.todo.todoList.push(action.data);
        break;
      case ADD_TODO_FAILURE:
        draft.addTodoLoading = false;
        draft.addTodoError = action.error;
        break;
      case ADD_TODO_INIT:
        draft.addTodoLoading = false;
        draft.addTodoDone = false;
        draft.addTodoError = null;
        break;
      case ADD_TODO_COMMENT_REQUEST:
        draft.addTodoCommentLoading = true;
        draft.addTodoCommentDone = false;
        draft.addTodoCommentError = null;
        break;
      case ADD_TODO_COMMENT_SUCCESS:
        draft.addTodoCommentLoading = false;
        draft.addTodoCommentDone = true;
        draft.todo.todoComment = action.data;
        break;
      case ADD_TODO_COMMENT_FAILURE:
        draft.addTodoCommentLoading = false;
        draft.addTodoCommentError = action.error;
        break;
      case ADD_TODO_COMMENT_INIT:
        draft.addTodoCommentLoading = false;
        draft.addTodoCommentDone = false;
        draft.addTodoCommentError = null;
        break;
      case LOAD_TODO_REQUEST:
        draft.loadTodoLoading = true;
        draft.loadTodoDone = false;
        draft.loadTodoError = null;
        break;
      case LOAD_TODO_SUCCESS:
        draft.loadTodoLoading = false;
        draft.loadTodoDone = true;
        draft.todo = action.data;
        break;
      case LOAD_TODO_FAILURE:
        draft.todo = {};
        draft.loadTodoLoading = false;
        draft.loadTodoError = action.error;
        break;
      case DELETE_TODO_REQUEST:
        draft.deleteTodoLoading = true;
        draft.deleteTodoDone = false;
        draft.deleteTodoError = null;
        break;
      case DELETE_TODO_SUCCESS:
        draft.deleteTodoLoading = false;
        draft.deleteTodoDone = true;
        draft.todo.todoList = draft.todo.todoList.filter((v) => v.id !== action.data);
        break;
      case DELETE_TODO_FAILURE:
        draft.deleteTodoLoading = false;
        draft.deleteTodoError = action.error;
        break;
      case DELETE_TODO_INIT:
        draft.deleteTodoLoading = false;
        draft.deleteTodoDone = false;
        draft.deleteTodoError = null;
        break;
      case UPDATE_TODO_REQUEST:
        draft.updateTodoLoading = true;
        draft.updateTodoDone = false;
        draft.updateTodoError = null;
        break;
      case UPDATE_TODO_SUCCESS:
        draft.updateTodoLoading = false;
        draft.updateTodoDone = true;
        draft.todo.todoList = draft.todo.todoList.map((v) => {
          if (v.id === action.data.id) {
            return action.data;
          }
          return v;
        });
        break;
      case UPDATE_TODO_FAILURE:
        draft.updateTodoLoading = false;
        draft.updateTodoError = action.error;
        break;
      case UPDATE_TODO_INIT:
        draft.updateTodoLoading = false;
        draft.updateTodoDone = false;
        draft.updateTodoError = null;
        break;
      case DELETE_TODO_COMMENT_REQUEST:
        draft.deleteTodoCommentLoading = true;
        draft.deleteTodoCommentDone = false;
        draft.deleteTodoCommentError = null;
        break;
      case DELETE_TODO_COMMENT_SUCCESS:
        draft.deleteTodoCommentLoading = false;
        draft.deleteTodoCommentDone = true;
        draft.todo.todoComment = null;
        break;
      case DELETE_TODO_COMMENT_FAILURE:
        draft.deleteTodoCommentLoading = false;
        draft.deleteTodoCommentError = action.error;
        break;
      case DELETE_TODO_COMMENT_INIT:
        draft.deleteTodoCommentLoading = false;
        draft.deleteTodoCommentDone = false;
        draft.deleteTodoCommentError = null;
        break;
      case UPDATE_TODO_COMMENT_REQUEST:
        draft.updateTodoCommentLoading = true;
        draft.updateTodoCommentDone = false;
        draft.updateTodoCommentError = null;
        break;
      case UPDATE_TODO_COMMENT_SUCCESS:
        draft.updateTodoCommentLoading = false;
        draft.updateTodoCommentDone = true;
        draft.todo.todoComment = action.data;
        break;
      case UPDATE_TODO_COMMENT_FAILURE:
        draft.updateTodoCommentLoading = false;
        draft.updateTodoCommentError = action.error;
        break;
      case UPDATE_TODO_COMMENT_INIT:
        draft.updateTodoCommentLoading = false;
        draft.updateTodoCommentDone = false;
        draft.updateTodoCommentError = null;
        break;
      default:
        break;
    }
  });
export default todoReducer;
