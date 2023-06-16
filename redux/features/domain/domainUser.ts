import {
    Action,
    AnyAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { RootState } from '../../store';

// here we are typing the types for the state
export type DomainUserState = {
    users: any,
    user: any,
    pending: boolean;
    error: boolean;
    message: any;
};

const initialState: DomainUserState = {
    users: {},
    user: {},
    pending: false,
    error: false,
    message: "",
};

interface HeadersConfiguration {
    params?: any,
    headers: {
        "Content-Type"?: string;
        "Accept"?: string
        "Authorization"?: string
    }
}

interface UserDomainData {
    data: any;
    token?: any;
    isSuccess: () => void
    isError: () => void
}

interface DefaultGetData {
    token?: any,
    params?: any
}

// rejection
interface RejectedAction extends Action {
    error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('rejected')
}

// domain-users-all
export const getDomainUserAll = createAsyncThunk<any, DefaultGetData, { state: RootState }>('domain-user-all', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        params: params.params,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.token}`
        },
    };
    try {
        const response = await axios.get("user/domain/all", config);
        const { data, status } = response;
        if (status == 200) {
            return data
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});

// domain-users-domain
export const getDomainUser = createAsyncThunk<any, DefaultGetData, { state: RootState }>('domain-user', async (params, { getState }) => {
    let config: HeadersConfiguration = {
        params: params.params,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${params.token}`
        },
    };

    let newData = {}

    try {
        const response = await axios.get("user/domain", config);
        const { data, status } = response;

        if (status == 200) {
            newData = {
                ...data,
                data: data?.data?.map((item: any) => ({
                    ...item.user,
                    domainStructure: item.domainStructure
                }))
            }
            return newData
        } else {
            throw response
        }
    } catch (error: any) {
        const { data, status } = error.response;
        let newError: any = { message: data.message[0] }
        toast.dark(newError.message)
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(newError.message);
        }
    }
});


// SLICER
export const domainPropertySlice = createSlice({
    name: 'domainUser',
    initialState,
    reducers: {
        // leave this empty here
        resetDomainUser(state) {
            state.user = {}
            state.pending = false
            state.error = false
            state.message = ""
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices. 
    // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes. 
    // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
    extraReducers: builder => {
        builder
            // get-domain-user-all
            .addCase(getDomainUserAll.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(getDomainUserAll.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    pending: false,
                    error: false,
                    users: payload
                }
            })
            .addCase(getDomainUserAll.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            // get-domain-user-domain only
            .addCase(getDomainUser.pending, state => {
                return {
                    ...state,
                    pending: true
                }
            })
            .addCase(getDomainUser.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    pending: false,
                    error: false,
                    users: payload
                }
            })
            .addCase(getDomainUser.rejected, (state, { error }) => {
                state.pending = false;
                state.error = true;
                state.message = error.message;
            })

            .addMatcher(isRejectedAction, (state, action) => { })
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

const domainUserReducers = domainPropertySlice.reducer;

export const { resetDomainUser } = domainPropertySlice.actions
export const selectDomainUser = (state: RootState) => state.domainUser;

export default domainUserReducers;