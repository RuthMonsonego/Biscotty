import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsers, deleteUser, addUser, updateUser, loginUser, fetchUser } from './usersApi'

const initialState = {
    arrUser: [],
    currentUser: {}
}

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers', 
    async  (thunkAPI) => {
        const res = await fetchUsers()
        return res;
    },
)

export const fetchUserr = createAsyncThunk(
    'users/fetchOneUser', 
    async  (id, thunkAPI) => {
        const res = await fetchUser(id);
        return res;
    },
)

export const deleteOneUser = createAsyncThunk(
    'users/deleteOneUser', 
    async  (thunkAPI) => {
        const res = await deleteUser()
        return res;
    },
)

export const addOneUser = createAsyncThunk(
    'users/addOneUser', 
    async  (user, thunkAPI) => {
        debugger;
        const res = await addUser(user)
        if(res.status!=401)
            return null;
        else return res
    },
)

export const updateOneUser = createAsyncThunk(
    'users/updateOneUser', 
    async  (user, thunkAPI) => {
        debugger;
        const res = await updateUser(user)
        return res;
    },
)

export const login = createAsyncThunk(
    'users/login', 
    async  (user, thunkAPI) => {
        const res = await loginUser(user)
        debugger
        if(res.status==401)
        return null;
        else return res.data
    },
)

export const usersSlice = createSlice({
    name: 'uesr',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = {};
        },
        fetchCurrentUser: (state) => {
            return state.currentUser;
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
            debugger;
            state.arrUser = payload;
        })
        .addCase(deleteOneUser.fulfilled, (state, action) => {
            let index = state.arrUser.findIndex(x => x.id === action.payload);
            state.arrUser.splice(index, 1);
        })
        .addCase(updateOneUser.fulfilled, (state, action) => {
            let index = state.arrUser.findIndex(x => x.id === action.payload.id);
            state.arrUser.splice(index, 1, action.payload);
        })
        .addCase(addOneUser.fulfilled, (state, action) => {
            debugger;
            state.arrUser.push(action.payload);
        })
        .addCase(login.fulfilled, (state, action) => {
            debugger;
            state.currentUser = action.payload;
        })
    }
})

export const { logoutUser, fetchCurrentUser } = usersSlice.actions;
export default usersSlice.reducer