import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import {userReducer} from "./slices/auth";

const store = configureStore({
    reducer: {
        users: usersReducer,
        user: userReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
