import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

// here we are typing the types for the state
export type AuthState = {
    data: any;
    isLogin: boolean;
    pending: boolean;
    error: boolean;
    message: any;
};

const initialState: AuthState = {
    data: {},
    isLogin: false,
    pending: false,
    error: false,
    message: "",
};

interface HeadersConfiguration {
    headers: {
        "Content-Type"?: string;
        "Accept"?: string
        "Authorization"?: string
    }
}

let config: HeadersConfiguration = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
};

// Login
export const webLogin = createAsyncThunk('login', async (params: any) => {
    let newData = {}
    try {
        const response = await axios.post("auth/web/login", params?.data, config);
        const { data, status } = response
        if (status == 200) {
            toast.dark("Sign in successfully!")
            setCookie('accessToken', data?.accessToken, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { maxAge: 60 * 60 * 24 })
            setCookie('access', data?.access)
            newData = {
                ...data,
                access: data.access
            }
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        const { data } = error.response
        console.log(error.message, "error")
        toast.dark(data.message[0] || data.error)
        return data
    }
});

// Login
export const webLoginGoogle = createAsyncThunk('loginGoogle', async (params: any) => {
    let newData = {}
    try {
        const response = await axios.post("auth/web/login/google", params?.data, config);
        const { data, status } = response
        console.log(response, "response login google rd")
        if (status == 200) {
            toast.dark("Sign in with google successfully!");
            setCookie('accessToken', data?.accessToken, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', data?.refreshToken, { maxAge: 60 * 60 * 24 })
            setCookie('access', data?.access)
            newData = {
                data: data.user,
                access: data.access,
                refreshToken: data.refreshToken,
                accessToke: data.accessToke,
            }
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        console.log(error.message, "error")
        toast.dark("error")
        return error.response.data
    }
});

// Register
export const webRegister = createAsyncThunk('register', async (params: any) => {
    let newData = {}
    try {
        const response = await axios.post("auth/web/register", params?.data, config);
        const { data, status } = response
        console.log(response, "response")
        if (status == 201) {
            toast.dark("Register is successfully")
            newData = {
                ...data,
                pathname: params?.pathname
            }
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        const { data } = error?.response
        console.log(data?.message[0], "error")
        toast.dark(data?.message[0] || data?.error)
        return data?.message[0] || data?.error
    }
});

// Profile - auth me
export const authMe = createAsyncThunk('my-profile', async (params: any) => {
    config = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${params?.token}`
        }
    }
    try {
        const response = await axios.get("auth/web/me", config);
        const { data, status } = response;
        // console.log(response, "response")
        if (status == 200) {
            return data;
        } else {
            throw response
        }
    } catch (error: any) {
        const { data } = error.response.data
        console.log(data.message[0], "error")
        toast.dark(data.message[0] || data.error)
        return data.message[0] || data.error
    }
});

// SLICER
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(webLogin.pending, state => {
                state.pending = true;
            })
            .addCase(webLogin.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload.user,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken,
                        access: payload.access,
                        pathname: payload.pathname
                    },
                }
            })
            .addCase(webLogin.rejected, (state, { payload }) => {
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});

export const loginGoogleSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(webLoginGoogle.pending, state => {
                state.pending = true;
            })
            .addCase(webLoginGoogle.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload.user,
                        accessToken: payload.accessToken,
                        refreshToken: payload.refreshToken,
                        access: payload.access,
                        pathname: payload.pathname
                    },
                }
            })
            .addCase(webLoginGoogle.rejected, (state, { payload }) => {
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(webRegister.pending, state => {
                state.pending = true;
            })
            .addCase(webRegister.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: false,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload.user,
                        pathname: payload.pathname
                    },
                }
            })
            .addCase(webRegister.rejected, (state, { payload }) => {
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});

export const profileSlice = createSlice({
    name: 'my-profile',
    initialState,
    reducers: {
        // leave this empty here
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            .addCase(authMe.pending, state => {
                state.pending = true;
            })
            .addCase(authMe.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    isLogin: true,
                    pending: false,
                    error: false,
                    data: {
                        ...state.data,
                        user: payload
                    },
                }
            })
            .addCase(authMe.rejected, (state, { payload }) => {
                state.isLogin  = false;
                state.pending = false;
                state.error = true;
                state.message = payload;
            })
            .addDefaultCase((state, action) => {
                let base = {
                    ...state,
                    ...action.state
                }
                return base
            })
    }
});
// SLICER

const loginReducers = loginSlice.reducer;
const loginGoogleReducers = loginGoogleSlice.reducer;
const registerReducers = registerSlice.reducer;
const profileReducers = profileSlice.reducer;

export const selectLogin = (state: RootState) => state.loginReducers;
export const selectLoginGoogle = (state: RootState) => state.loginGoogleReducers;
export const selectRegister = (state: RootState) => state.registerReducers;
export const selectAuth = (state: RootState) => state.profileReducers;

export { loginReducers, profileReducers, registerReducers, loginGoogleReducers };