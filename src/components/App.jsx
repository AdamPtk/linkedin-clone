import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase/firebase';
import Login from './Login/Login';
import Register from './Login/Register';
import Header from './Header/Header';
import Sidebar from './Feed/Sidebar';
import Feed from './Feed/Feed';
import Widgets from './Feed/Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        navigate('/feed');
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
              <Route path="/feed" element={<Feed />} />
            </Routes>
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
