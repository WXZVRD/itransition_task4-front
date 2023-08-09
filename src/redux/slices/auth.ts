import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../components/TableList";
import {fetchMe, fetchUpdate, fetchRegister, fetchAuth} from "../controller/authControlller";


const LS = localStorage;

interface UserState {
    user: IUser;
    token: string;
    error?: ServerError | null;
}

export interface ServerError {
    type?: string;
    msg: string;
    path?: string;
    location?: string;
}


export const userSlice = createSlice({
    name: "meSlice",
    initialState: <UserState>{
        user: <IUser>{},
        token: "",
        error: null
    },
    reducers: {
        setOnline: (state, action: PayloadAction<string>) => {
            state.user.stat = action.payload
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = {
                id: 0,
                nick: '',
                secondName: '',
                email: '',
                pass: '',
                created_at: '',
                last_login: '',
                stat: '',
                blocked: 0,
                selected: false
            },
            state.token = ''

            LS.clear()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.user = action.payload.user;
                state.token = action.payload.token;

                LS.setItem('user', JSON.stringify(action.payload.user));
                LS.setItem('token', action.payload.token);
            })
            .addCase(fetchMe.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.user = action.payload.user;

                LS.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload as ServerError;
                }
            })
            .addCase(fetchUpdate.fulfilled, (state, action) => {
                if (action.payload) {
                    state.error = action.payload as ServerError;
                }
            })
            .addCase(fetchUpdate.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload as ServerError;
                }
            });


    },
});
export const { setUser, setToken, setOnline, logout } = userSlice.actions
export const userReducer = userSlice.reducer;
