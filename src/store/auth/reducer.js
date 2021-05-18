import { authConst } from './types';

//создаём объект началльного состояния нашей аутентификации
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: null,
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
    case `${authConst.USER_LOGIN}_SUCCEESS`:
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
        error: action.payload.error,
      }
      break;
  }
  console.log(action);
  return state;
}