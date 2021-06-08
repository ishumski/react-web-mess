import { authConst } from './types';

//создаём объект начального состояния нашей аутентификации
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  authenticating: false,
  authenticated: false,
  error: null
}

export default (state = initialState, action) => {

  console.log(action);

  switch (action.type) {

    case `${authConst.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: true
      }
      break;

    case `${authConst.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false
      }
      break;

    case `${authConst.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error
      }
      break;

    case `${authConst.USER_LOGOUT}_REQUEST`:
      break;

    case `${authConst.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initialState
      }
      break;
      
    case `${authConst.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
  }
  return state;
}