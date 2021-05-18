import db, { auth } from '../firebase';

export const signUp = (user) => {
  return async (dispatch) => {
    auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data)
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
              })
              .catch(error => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
      })
  }
}