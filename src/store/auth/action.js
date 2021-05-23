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
              .doc(data.user.uid)
              .set({
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
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
  return async (dispatch) => {

    dispatch({
      type: `${authConst.USER_LOGIN}_REQUEST`
    });

    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data);

        const name = data.user.displayName.split(" ");
        const firstName = name[0];
        const lastName = name[1];


        const loggedInUser = {
          firstName,
          lastName,
          uid: data.user.uid,
          email: data.user.email
        }

        localStorage.setItem('user', JSON.stringify(loggedInUser));

        console.log(loggedInUser);
        dispatch({
          type: `${authConst.USER_LOGIN}_SUCCESS`,
          payload: { user: loggedInUser }
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: `${authConst.USER_LOGIN}_FAILURE`,
          payload: { error }
        })
      })
  }
}

//при загрузке данные на странице не очищаются

export const isLoggedInUser = () => {
  return async (dispatch) => {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    if (user) {
      dispatch({
        type: `${authConst.USER_LOGIN}_SUCCESS`,
        payload: { user }
      })
    } else {
      dispatch({
        type: `${authConst.USER_LOGIN}_FAILURE`,
        payload: { error: 'Login again please' }
      });
    }
  }
}

export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({
      type: `${authConst.USER_LOGOUT}_REQUEST`
    });

    db.collection('users')
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        auth
          .signOut()
          .then(() => {
            localStorage.clear();
            dispatch({
              type: `${authConst.USER_LOGOUT}_SUCCESS`
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: `${authConst.USER_LOGOUT}_FAILURE`,
              payload: {
                error
              }
            });
          })
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });



  }
}