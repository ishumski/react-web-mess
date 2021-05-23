import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUsers } from '../../store/user/action';
import './Home.css';

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
                <div className="displayPic">
                  <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
                </div>
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
      <div className="chatArea">
        <div className="chatHeader">{user.firstName}{user.lastName}</div>
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
