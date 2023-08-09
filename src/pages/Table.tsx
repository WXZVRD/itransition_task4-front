import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper } from '@mui/material';
import {setOnlineStatus} from '../redux/slices/usersSlice';
import {fetchUsers} from "../redux/controller/usersController";

import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import TableList from '../components/TableList';
import Notify from '../components/Notify';

import socket from "../socket";

const Table = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.user);
    const navigate = useNavigate();
    const userList = useAppSelector(state => state.users.list);

    const storedToken = localStorage.getItem('token');

    const [isBlocked, setIsBlocked] = useState(false)



    useEffect(() => {
        if (!storedToken) {
            navigate('/authorization');
        } else {
            dispatch(fetchUsers());
        }
    }, []);

    useEffect(()=>{
        socket.on('connect', () => {
            console.log('Connected.')
        })
        socket.on('disconnect', () => {
            console.log('Disconnected.')
        })

        if (user.email){
            socket.emit('join', user.email)
            dispatch(setOnlineStatus({ email: user.email, status:'online' }));
        }
        socket.on('userJoined', (email) => {
            dispatch(setOnlineStatus({ email: email, status:'online' }));
        })
        socket.on('userLeft', (email) => {
            dispatch(setOnlineStatus({ email: email, status:'offline' }));
        })

        const handleBeforeUnload = () => {
            if (user.email) {
                socket.emit('userDisconnect', user.email);
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    },[user])

    useEffect(() => {
        const me = userList.find(el => el.id === user.id)
        if (me){
            setIsBlocked(Boolean(me.blocked))
        }
    }, [userList])

    const handleExit = () => {
        socket.emit('userDisconnect', (user.email))
        navigate('/registration');
    };

    return (
        <>
            {isBlocked ? (
                <Paper sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <p>You were blocked. You can leave the account!</p>
                    <Button onClick={handleExit} color='error' variant='contained'>
                        exit
                    </Button>
                </Paper>
            ) : (<Container maxWidth='xl'>
                    <Header/>
                    {userList.find(el => el.selected) ? <Toolbar/> : ''}
                    <TableList/>
                    <Notify />
            </Container>)}
        </>
    );
};

export default Table;
