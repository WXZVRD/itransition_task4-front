import {Box, List} from '@mui/material';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {changeStatus, fetchUsers} from "../redux/controller/usersController";
import {setBlockedStatus} from "../redux/slices/usersSlice";
import socket from "../socket";

export interface IUser {
    id: number;
    nick: string;
    secondName: string;
    email: string;
    pass: string;
    created_at: string;
    last_login: string;
    stat: string;
    blocked: number;
    selected: boolean
}

const TableList: FC = ( ) => {
    const { list, status } = useAppSelector(state => state.users);
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('changeStatus', (userList: Array<IUser>) => {
            dispatch(setBlockedStatus(userList))
        });

        socket.on('deleteUsers', (userList: Array<IUser>) => {
            dispatch(fetchUsers)
        });
    }, []);


    return (
        <Box sx={{overflowX:'auto', minWidth:'1200px'}}>
            <TableHeader />
            <List sx={{flexGrow: 1, overflowY: 'auto', maxHeight: '500px',
                    '&::-webkit-scrollbar': {
                        width: '0.4em',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        backgroundColor: '#F5F5F5',
                    },
                }}>
                {list && list.map((user: IUser) => (
                    <TableRow key={user.id} user={user} />
                ))}
            </List>
        </Box>
    );
};


export default TableList;
