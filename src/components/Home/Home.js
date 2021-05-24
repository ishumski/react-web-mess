import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../store/user/action';
import './Home.css';

import { Avatar, Button } from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';

function Home(props) {

  const dispatch = useDispatch();

  const auth = useSelector(store => store.auth);
  const user = useSelector(store => store.user);
  const [input, setInput] = useState('');
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

  useEffect(() => {
    return () => {
      unsubscribe.then(unsub => unsub()).catch(error => console.log(error))
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);
    setInput('')

  }

  return (
    <div className="container">
      <div className="listOfUsers">

        {(user.users.length > 0) ? (
          user.users.map(user => {
            return (
              <div key={user.uid} className="displayName">

                <Avatar />

                <div className='userName'>
                  <span>{user.firstName}{user.lastName}</span>
                  <span className="isOnline">{user.isOnline ? 'online' : 'offline'}</span>
                </div>
              </div>
            )
          })
        ) : null
        }
      </div>

      <div className="chat">
        <div className="chat__header">
          <Avatar />
          <div className="chat__header_info">
            <span>{auth.firstName}{auth.lastName}</span>
          </div>
        </div>

        <div className="chat__body">
          <p className="chat__message">
            Hello, mr. White
            </p>
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
