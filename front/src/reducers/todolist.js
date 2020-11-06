import produce from '../utils/produce';

export const initialState = {
    mainTodolist: [],
    feedTodolist:[],//투두피드
    addPlanLoading: false, // 로그인 여부
    addPlanDone: false, // 계획 추가중
    addPlanError: null, // 계획 추가 실패 사유    
    loadTodosLoading: false,
    loadTodosDone: false,
    loadTodosError: null,
    checked:false//투두 체크 여부
};

//계획추가
export const ADD_PLAN_REQUEST = 'ADD_PLAN_REQUEST';
export const ADD_PLAN_SUCCESS = 'ADD_PLAN_SUCCESS';
export const ADD_PLAN_FAILURE = 'ADD_PLAN_FAILURE';

export const LOAD_PLAN_REQUEST = 'LOAD_PLAN_REQUEST';
export const LOAD_PLAN_SUCCESS = 'LOAD_PLAN_SUCCESS';
export const LOAD_PLAN_FAILURE = 'LOAD_PLAN_FAILURE';
//계획 체크
export const UPDATE_TODOCHECK_REQUEST = 'UPDATE_TODOCHECK_REQUEST';
export const UPDATE_TODOCHECK_SUCCESS = 'UPDATE_TODOCHECK_SUCCESS';
export const UPDATE_TODOCHECK_FAILURE = 'UPDATE_TODOCHECK_FAILURE';
//계획 삭제
export const DELETE_TODOCHECK_REQUEST = 'DELETE_TODOCHECK_REQUEST';
export const DELETE_TODOCHECK_SUCCESS = 'DELETE_TODOCHECK_SUCCESS';
export const DELETE_TODOCHECK_FAILURE = 'DELETE_TODOCHECK_FAILURE';
//투두피드
export const LOAD_TODOFEED_REQUEST = 'LOAD_TODOFEED_REQUEST';
export const LOAD_TODOFEED_SUCCESS = 'LOAD_TODOFEED_SUCCESS';
export const LOAD_TODOFEED_FAILURE = 'LOAD_TODOFEED_FAILURE';

const todolistReducer = (state = initialState, action) => produce(state, (draft) => {
    
    switch (action.type) {
        case ADD_PLAN_REQUEST:
            draft.addPlanLoading = true;
            draft.addPlanDone = false;
            draft.addPlanError = null;
            break;
        case ADD_PLAN_SUCCESS:
            draft.addPlanLoading = false;
            draft.addPlanDone = true;
            draft.mainTodolist.push(action.data);
            break;
        case ADD_PLAN_FAILURE:
            draft.addPlanLoading = false;
            draft.addPlanError = action.error;
            break;
        case LOAD_PLAN_REQUEST:
            draft.loadTodosLoading = true;
            draft.loadTodosDone = false;
            draft.loadTodosError = null;
            break;
        case LOAD_PLAN_SUCCESS:
            draft.loadTodosLoading = false;
            draft.loadTodosDone = true;
            draft.mainTodolist = action.data;
            break;
        case LOAD_PLAN_FAILURE:
            draft.loadTodosLoading = false;
            draft.loadTodosError = action.error;
            break;
        case UPDATE_TODOCHECK_REQUEST:
            break;
        case UPDATE_TODOCHECK_SUCCESS:
            draft.mainTodolist.find((v)=>v.id === action.data.id).checked=action.data.checked;
            break;
        case UPDATE_TODOCHECK_FAILURE:
            break;
        case DELETE_TODOCHECK_REQUEST:
            break;
        case DELETE_TODOCHECK_SUCCESS:
            //console.log("action.date----"+action.data)
            draft.mainTodolist = draft.mainTodolist.filter((v) => v.id !== action.data);
            break;
        case DELETE_TODOCHECK_FAILURE:
            break;
        case LOAD_TODOFEED_REQUEST:
            break;
        case LOAD_TODOFEED_SUCCESS:
            draft.feedTodolist=action.data;
            break;
        case LOAD_TODOFEED_FAILURE:
            break;
        default:
            break;
    }
});
export default todolistReducer;
