import db from '../../firebase';
import { userConst } from './types';

export const getRealtimeUsers = (uid) => {

  return async (dispatch) => {

    dispatch({
      type: `${userConst.GET_REALTIME_USERS}_REQUEST`
    });

    const unsubscribe = db.collection('users')
      .onSnapshot((snapshot) => {

        const users = [];
        snapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        // console.log(users);

        dispatch({
          type: `${userConst.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users }
        });
      });
    return unsubscribe;
  }
}