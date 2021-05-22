import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

function Home(props) {

  const auth = useSelector(store => store.auth);
  const userName = `${auth.firstName} ${auth.lastName}`;

  return (
    <div className="container">
      <div className="listOfUsers">

        <div className="displayName">
          <div className="displayPic">
            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
          </div>
          <div className='userName'>
            <span>{userName}</span>
            <span className="isOnline">online</span>
          </div>
        </div>

      </div>
      <div className="chatArea">
        <div className="chatHeader">{userName}</div>
        <div className="messageSections">

          <div style={{ textAlign: 'left' }}>
            <p className="messageStyle" >Hello User</p>
          </div>

        </div>
        <div className="chatControls">
          <textarea />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Home
