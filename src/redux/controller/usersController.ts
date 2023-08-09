import instance from "../../axios";
import { IUser } from "../../components/TableList";
import {createAsyncThunk} from "@reduxjs/toolkit";

enum BlockStatus {
    Unblocked = 0,
    Blocked = 1,
}


export const fetchUsers = createAsyncThunk<IUser[], void>('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await instance.get<IUser[]>('/users');
        return response.data;
    } catch (err) {
        return rejectWithValue(undefined);
    }
});

export const deleteUsers = createAsyncThunk('users/deleteUsers', async (selectedUsers: IUser[]) => {
    await instance.delete('/users/delete', {
        data: selectedUsers,
    });
    return selectedUsers;
});

export const changeStatus = createAsyncThunk('users/changeStatus', async (selectedUsers: IUser[]) => {
    await instance.put('/users/change', selectedUsers);
    return selectedUsers;
});

export const updateSelection = (userList: IUser[], userId: number) => {
    if (userId === 0) {
        userList.forEach(user => {
            user.selected = true;
        });
    } else if (userId === -1) {
        userList.forEach(user => {
            user.selected = false;
        });
    } else {
        const user = userList.find(user => user.id === userId);
        if (user) {
            user.selected = !user.selected;
        }
    }
};

export const updateOnlineStatus = (userList: IUser[], email: string, newStatus: string) => {
    return userList.map(user => {
        if (user.email === email) {
            return { ...user, stat: newStatus };
        }
        return user;
    });
};

export const updateBlockedStatus = (userList: IUser[], updUsers: IUser[]) => {
    const updList = updUsers.map(updUser => updUser.id);
    return userList.map(user => {
        if (updList.includes(user.id)) {
            const updatedUser = updUsers.find(u => u.id === user.id);
            if (updatedUser) {
                const newBlockedStatus = updatedUser.blocked === BlockStatus.Blocked
                    ? BlockStatus.Unblocked
                    : BlockStatus.Blocked;

                return {
                    ...user,
                    blocked: newBlockedStatus
                };
            }
        }
        return user;
    });
};
