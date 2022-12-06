import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./authApi";


const initialState = {
    value: null,
    status: {
        loading: true,
    },
};

export const loadAuthAsync = createAsyncThunk("auth/fetchUser", fetchUser);

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action) => {
            state.value = action.payload;
        },
        updateAuth: (state, action) => {
            state.value = { ...state.value, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuthAsync.pending, (state) => {
                state.status = { loading: true };
            })
            .addCase(loadAuthAsync.fulfilled, (state, action) => {
                state.status = { loading: false, error_status: action.payload.status, statusText: action.payload.statusText };
                state.value = action.payload?.data;
            })
    }
});

export const selectAuth = (state) => state.auth.value;

export const selectAuthStatus = (state) => state.auth.status;

export const { setAuth, updateAuth } = authSlice.actions;

export default authSlice.reducer;