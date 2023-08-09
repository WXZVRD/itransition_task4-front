import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, deleteUsers, changeStatus, updateBlockedStatus, updateOnlineStatus, updateSelection } from "../controller/usersController";
import { IUser } from "../../components/TableList";

enum USER_STATUS {
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
}

interface UserState {
    list: IUser[];
    status: USER_STATUS;
}



const initialState: UserState = {
    list: [],
    status: USER_STATUS.LOADING,
};

export const usersSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setSelection(state, action: PayloadAction<number>) {
            updateSelection(state.list, action.payload);
        },
        setOnlineStatus(state, action: PayloadAction<{ email: string, status: string }>) {
            state.list = updateOnlineStatus(state.list, action.payload.email, action.payload.status);
        },
        setBlockedStatus(state, action: PayloadAction<IUser[]>) {
            state.list = updateBlockedStatus(state.list, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.list = [];
                state.status = USER_STATUS.LOADING;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.list = action.payload;
                state.status = USER_STATUS.LOADED;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.list = [];
                state.status = USER_STATUS.ERROR;
            })
            .addCase(deleteUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.list = state.list.filter(user => !action.payload.some(e => e.id === user.id));
                state.status = USER_STATUS.LOADED;
            })
            .addCase(changeStatus.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.list = updateBlockedStatus(state.list, action.payload);
                state.status = USER_STATUS.LOADED;
            });
    },
});

export const { setSelection, setOnlineStatus, setBlockedStatus } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
