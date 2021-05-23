import { userConst } from './types';

const initialState = {
  users: [],
}

export default (state = initialState, action) => {

  switch (action.type) {

    case `${userConst.GET_REALTIME_USERS}_REQUEST`:
      break;

    case `${userConst.GET_REALTIME_USERS}_SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      }
      break;

    case `${userConst.GET_REALTIME_USERS}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      }
      break;
  }
  return state;
}