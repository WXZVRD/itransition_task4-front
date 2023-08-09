import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useAppDispatch} from "./redux/hook";
import Auth from './pages/Auth';
import Register from './pages/Register';
import Table from './pages/Table';
import Profile from './pages/Profile';
import {setUser, setToken} from "./redux/slices/auth";

function App() {
    const dispatch = useAppDispatch();
    const LS = localStorage;
    const user = LS.getItem('user');
    const token = LS.getItem('token');


    useEffect(() => {
        if (user && token) {
            dispatch(setUser(JSON.parse(user)));
            dispatch(setToken(token));
        }
    }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Table/>}/>
          <Route path='/registration' element={<Register/>}/>
          <Route path='/authorization' element={<Auth />}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
