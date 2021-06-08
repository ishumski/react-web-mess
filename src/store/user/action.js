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

        dispatch({
          type: `${userConst.GET_REALTIME_USERS}_SUCCESS`,
          payload: { users }
        });
      });
    return unsubscribe;
  }
}

export const updateMessage = (messageObj) => {
  return async (dispatch) => {
    db.collection('chats').add({
      ...messageObj,
      isViewed: false,
      createdAt: new Date()
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const getRealtimeChats = (user) => {
  return async (dispatch) => {

    db.collection('chats')
      .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {

        const chats = [];

        snapshot.forEach((doc) => {

          if (
            (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
            ||
            (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
          ) {
            chats.push(doc.data())
          }
        });

        dispatch({
          type: userConst.GET_REALTIME_MESSAGES,
          payload: { chats }
        })
        console.log(chats);
      })
  }
}