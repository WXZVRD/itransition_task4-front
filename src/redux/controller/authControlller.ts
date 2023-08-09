import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../../axios";
import {IRegData} from "../../pages/Register";

interface IData {
    email: string;
    password: string;
}

export const fetchAuth = createAsyncThunk('auth/authMe', async (params:IData, { rejectWithValue }) => {
    try {
        const { data } = await instance.post('auth/login', params);
        return data
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})
export const fetchMe = createAsyncThunk('me/fetchMe', async (token: string, { rejectWithValue }) => {
    try {
        const { data } = await instance.get('/auth/me')
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
})

export const fetchRegister = createAsyncThunk('reg/fetchReg', async (dataAuth: IRegData, { rejectWithValue }) => {
    try {
        await instance.post("/auth/registry", dataAuth);
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchUpdate = createAsyncThunk('update/fetchUpdate', async (data: IRegData, { rejectWithValue }) => {
    try {
        const resp = await instance.put("/auth/update", data);
        return resp.data
    } catch (err: any) {
        return rejectWithValue(err);
    }
});
