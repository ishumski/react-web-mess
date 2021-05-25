import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../store/user/action';
import './Home.css';

import { Avatar, Button } from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';




const User = (props) => {
  const { user, onClick } = props;
  return (
    <div
      onClick={() => onClick(user)}
      key={user.uid}
      className="displayName"
    >

      <Avatar />

      <div className='userName'>
        <span>{user.firstName}{user.lastName}</span>
        <span className="isOnline">{user.isOnline ? 'online' : 'offline'}</span>
      </div>
    </div>
  )
}


function Home(props) {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState(false);
  const [chatUser, setChatUser] = useState('');
  let unsubscribe;


  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then(unsubscribe => {
        return unsubscribe;
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  //componentWillUnmount
  useEffect(() => {
    //cleanup
    return () => {
      unsubscribe.then(unsub => unsub()).catch(error => console.log(error))
    }
  }, []);

  const initChat = (user) => {
    setChat(true);
    setChatUser(`${user.firstName} ${user.lastName}`)
    console.log(user)
  }

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput('')

  }


  return (
    <div className="container">
      <div className="listOfUsers">

        {user.users.length > 0 ?
          user.users.map(user => {
            return (
              <User
                key={user.uid}
                user={user}
                onClick={initChat}
              />
            );
          }) : null
        }
      </div>

      <div className="chat">
        <div className="chat__header">
          <div className="chat__header_info">
            {chat ? chatUser : ('')}
          </div>



        </div>

        <div className="chat__body">
          {chat ?
            <p className="chat__message">
              Hello, mr. White
            </p>
            : null}

        </div>

        <div className="chat__footer">
          <form>

            <SentimentVerySatisfiedIcon />
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
              placeholder="Type a message"

            />

            <Button
              className="chat__footer-btn"
              type="submit"
              onClick={sendMessage}
            >
              Send a Message
                    </Button>
            <MicIcon />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
