import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signIn } from '../../store/auth/action';
import './Login.css';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(false);
  const dispatch = useDispatch();

  /* useSelector это аналог mapStateToProps. 
  Хук принимает на вход селектор - метод, 
  который принимает redux state
  и возвращает из него необходимые данные.*/
  const auth = useSelector(state => state.auth);

  const userLogin = (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    dispatch(signIn({ email, password }))

    console.log(email, password);
  }
  
  if (auth.authenticated) {
    return <Redirect to={'/'} />
  }

  const handleOpen = () => {
    setOpenSignIn(true);
  }

  const handleClose = () => {
    setOpenSignIn(false);
  }

  return (
    <div className="login">
      Login
      <Modal

        open={openSignIn}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={userLogin} >Sign In</Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Login;
