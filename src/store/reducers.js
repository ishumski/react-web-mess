import { combineReducers } from "redux";
import auth from './auth/reducer';
import user from './user/reducer';

const reducer = combineReducers({
  auth: auth,
  user: user,
})

export default reducer;