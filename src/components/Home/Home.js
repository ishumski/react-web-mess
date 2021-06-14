import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeChats, getRealtimeUsers, updateMessage } from '../../store/user/action';
import './Home.css';
import User from './User/User';
import { Button } from '@material-ui/core';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';

function Home() {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const [chatStarted, setChatStarted] = useState(false);

  const [chatUser, setChatUser] = useState('');

  const [message, setMessage] = useState('');

  const [userUid, setUserUid] = useState(null);

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
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    dispatch(getRealtimeChats({
      uid_1: auth.uid,
      uid_2: user.uid
    }))
  }


  const sendMessage = (event) => {
    event.preventDefault();

    const messageObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    }

    if (message !== '') {
      dispatch(updateMessage(messageObj))
        .then(() => {
          setMessage('')
        });
    }
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
            {
              chatStarted ? chatUser : ('')
            }
          </div>

        </div>

        <div className="chat__body">
          {
            chatStarted ?
              user.chats.map(chat =>
                <div
                  key={chat.createdAt}
                  style={{ textAlign: chat.user_uid_1 === auth.uid ? 'right' : 'left' }}
                >
                  <p className="chat__message">
                    {chat.message}
                  </p>
                </div>
              ) : <span className='chat__choose_message'>Выберите, кому хотели бы написать</span>}

        </div>

        <div className="chat__footer">
          <form>

            <SentimentVerySatisfiedIcon />
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
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

export default Home;
