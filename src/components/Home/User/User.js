import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import './User.css';

function User({ user, onClick }) {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed((Math.floor(Math.random() * 1000)))
  }, []);

  return (
    <div
      onClick={() => onClick(user)}
      key={user.uid}
      className="displayName"
    >
      <Avatar src={`https://avatars.dicebear.com/api/bottts/:${seed}.svg`} />

      <div className='userName'>
        <span>{user.firstName} {user.lastName}</span>
        <span className='userStatus'>
          {
            user.isOnline ? (
              <span className="isOnline">online</span>
            ) : (
              <span className="isOffline">offline</span>
            )
          }
        </span>
      </div>
    </div>
  )
}

export default User;
