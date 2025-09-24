// import {
//  LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT, CLEAR_ERROR, SET_LOADING
// } from "../actions";

const auth_reducer = (state, action) => {
  // if (action.type === LOGIN_START) {
  //   return {...state, loading: true, error: null}
  // }
  // if (action.type === LOGIN_SUCCESS) {
  //  return {...state, loading: false, isAuthenticated: true, admin: action.payload.admin, token: action.payload.token, error: null}
  // }
  // if (action.type === LOGIN_FAILURE) {
  //   return {...state, loading: false, isAuthenticated: false, admin:null, token: null, error: action.payload}
  // }
  // if (action.type === LOGOUT) {
  //   return{...state, isAuthenticated: false, admin: null, token: null, error: null, loading: false}
  // }
  // if (action.type === CLEAR_ERROR) {
  //   return {...state, error: null}
  // }
  // if (action.type === SET_LOADING) {
  //   return {...state, loading: action.payload}
  // }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default auth_reducer;