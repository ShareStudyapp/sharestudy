import produce from '../utils/produce';

export const initialState = {
    mainTodolist: [],
    addPlanLoading: false, // 로그인 여부
    addPlanDone: false, // 계획 추가중
    addPlanError: null, // 계획 추가 실패 사유    
    loadTodosLoading: false,
    loadTodosDone: false,
    loadTodosError: null,
};

//계획추가
export const ADD_PLAN_REQUEST = 'ADD_PLAN_REQUEST';
export const ADD_PLAN_SUCCESS = 'ADD_PLAN_SUCCESS';
export const ADD_PLAN_FAILURE = 'ADD_PLAN_FAILURE';

export const LOAD_PLAN_REQUEST = 'LOAD_PLAN_REQUEST';
export const LOAD_PLAN_SUCCESS = 'LOAD_PLAN_SUCCESS';
export const LOAD_PLAN_FAILURE = 'LOAD_PLAN_FAILURE';

const todolistReducer = (state = initialState, action) => produce(state, (draft) => {
    console.log(action.data)
    switch (action.type) {
        case ADD_PLAN_REQUEST:
            draft.addPlanLoading = true;
            draft.addPlanDone = false;
            draft.addPlanError = null;
        break;
        case ADD_PLAN_SUCCESS:
            draft.addPlanLoading = false;
            draft.addPlanDone = true;
            //draft.mainTodolist.unshift(action.data);
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
        default:
            break;
    }
});
export default todolistReducer;
