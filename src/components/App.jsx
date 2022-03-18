import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase/firebase';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          }),
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  console.log(user);
  return (
    <div className="app">
      {!user ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <Header />
          <div className="app_body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Feed />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
