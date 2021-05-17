import { auth } from '../firebase';

export const signUp = (user) => {
  return async (dispatch) => {
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        alert(error.message);
      })
  }
}