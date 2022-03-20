import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase/firebase';
import Login from './Login/Login';
import Register from './Login/Register';
import RegisterImgUpload from './Login/RegisterImgUpload';
import Header from './Header/Header';
import FeedPage from './Pages/FeedPage';
import MyNetworkPage from './Pages/MyNetworkPage';
import JobsPage from './Pages/JobsPage';
import MessagesPage from './Pages/MessagesPage';
import NotificationsPage from './Pages/NotificationsPage';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        navigate('/feed');
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
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
            <Routes>
              <Route path="/register/avatar" element={<RegisterImgUpload />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/mynetwork" element={<MyNetworkPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
