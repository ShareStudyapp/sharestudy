export const initialState = {
    isLoggedIn: false, // 로그인 여부
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    logInErrorReason: '', // 로그인 실패 사유
    isSignedUp: false, // 회원가입 성공
    isSigningUp: false, // 회원가입 시도중
    signUpErrorReason: '', // 회원가입 실패 사유
    me: null, // 내 정보
    userInfo: null, // 남의 정보
  };
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export default (state = initialState, action) => {
  switch (action.type) {
      
      case SIGN_UP_REQUEST: {
        return {
          ...state,
          isSigningUp: true,
          isSignedUp: false,
          signUpErrorReason: ''
        };
      }
      case SIGN_UP_SUCCESS: {
        return {
          ...state,
          isSigningUp: false,
          isSignedUp: true,
        };
      }
      case SIGN_UP_FAILURE: {
        return {
          ...state,
          isSigningUp: false,
          signUpErrorReason: action.error,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };