import React, { useState, useEffect } from 'react';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token')
      setSessionToken(token);
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const updateUserId = (newId) => {
    localStorage.setItem('owner_id', newId);
    setUserId(newId);
  };
  //console.log(newId)

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  };

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}
    owner_id = {userId}/>
     : <Auth updateToken = {updateToken}
    updateUserId = {updateUserId}/>
    )};
  
  return (
    <div>
        {protectedViews()} 
      <SiteBar clickLogout = {clearToken}/>
      </div>
  );
};

export default App;
