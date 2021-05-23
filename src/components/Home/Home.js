import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../store/user/action';
import './Home.css';

import { Avatar, IconButton, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';

function Home(props) {

  const dispatch = useDispatch();

  const auth = useSelector(store => store.auth);
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch(getRealtimeUsers(auth.uid));
  }, []);

  return (
    <div className="container">
      <div className="listOfUsers">

        {(user.users.length > 0) ? (
          user.users.map(user => {
            return (
              <div className="displayName">

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
              value={''}
              onChange={() => { }}
              type="text"
              placeholder="Type a message"

            />

            <Button
              className="chat__footer-btn"
              type="submit"

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
