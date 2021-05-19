import db, { auth } from '../../firebase';
import { authConst } from './types';

export const signUp = (user) => {
  return async (dispatch) => {

    dispatch({
      type: `${authConst.USER_LOGIN}_REQUEST`
    });

    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {

        const currentUser = auth.currentUser;

        const name = `${user.firstName} ${user.lastName}`;

        currentUser.updateProfile({
          displayName: name
        })
          .then(() => {
            db.collection("users")
              // .doc(data.user.uid)
              .add({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
              })
              .then(() => {
                const loggedInUser = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  uid: data.user.uid,
                  email: user.email,
                }
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User is logged");
                dispatch({
                  type: `${authConst.USER_LOGIN}_SUCCESS`,
                  payload: {
                    user: loggedInUser,
                  }
                })
              })
              .catch(error => {
                console.log(error);
                dispatch({
                  type: `${authConst.USER_LOGIN}_FAILURE`,
                  payload: { error }
                });
              });
          });
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const signIn = (user) => {
return async dispatch => {
  
}
}