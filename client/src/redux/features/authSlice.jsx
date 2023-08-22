import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiDelete, apiGet, apiPatch, apiPost } from "../../services/services";
import { CHANGE_IMAGE, CHANGE_ROLE, DELETE_USER, GET_ALL_USERS, LOGIN_ROUTE, REGISTER_ROUTE, TOKEN_KEY, USER_INFO_ROUTE } from "../../constant/url";

export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",async(bodyData,thankAPI)=>{
        try {
            const {data} = await apiGet(GET_ALL_USERS);
            return data;
        } catch (err) {
            return thankAPI.rejectWithValue(err.response.data.err)
        }
    }
)

export const signUpRequest = createAsyncThunk(
    "auth/signUpRequest",async(bodyData,thankAPI)=>{
        try {
            const {data} = await apiPost(REGISTER_ROUTE,bodyData);
            return data;
            
        } catch (err) {
            return thankAPI.rejectWithValue(err.response.data.err)
        }
    }
)

export const signInRequest = createAsyncThunk(
    "auth/signInRequest",async(bodyData,thankAPI)=>{
        try {
            const {data} = await apiPost(LOGIN_ROUTE,bodyData);
            return data;  
        } catch (err) {
            return thankAPI.rejectWithValue(err.response.data.err)
        }
    }
)
export const getUserInfo = createAsyncThunk(
    "auth/getUserInfo",async(thankAPI)=>{
        try {
            const {data} = await apiGet(USER_INFO_ROUTE);
            return data;  
        } catch (err) {
            console.log(err)
            return thankAPI.rejectWithValue(err.response.data.err)
        }
    }
)

export const deleteUserByAdmin = createAsyncThunk(
    "auth/deleteUserByAdmin",async (bodyData, thunkAPI) => {
      try {
          const {data} = await apiDelete(DELETE_USER + bodyData)
          console.log(data);
          return thunkAPI.fulfillWithValue(data)
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response)
      }
    }
  );

  export const changeRoleByAdmin = createAsyncThunk(
    "auth/changeRoleByAdmin", async (bodyData, thunkAPI) => {
      try {   
        const { data } = await apiPatch(`${CHANGE_ROLE}${bodyData._id}/${bodyData.role}`);
        return thunkAPI.fulfillWithValue(data);
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  );
  export const updateProfileImage = createAsyncThunk(
    "auth/updateProfileImage", async (bodyData, thunkAPI) => {
      try {   
        const { data } = await apiPatch(CHANGE_IMAGE,bodyData);
        return thunkAPI.fulfillWithValue(data);
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  );


  

const initialState = {
    allUsers:[],
    user: null,
    loading: false,
    error: null,
    status:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(signUpRequest.pending,(state,action)=>{
            state.error = null
            state.loading = true
        })
        .addCase(signUpRequest.fulfilled,(state,action)=>{
            state.error = null
            state.loading = false
            if (action.payload._id) {
                state.status = true
            }
        })
        .addCase(signUpRequest.rejected,(state, action)=>{
            state.error = action.payload;
            state.loading = false
        })
        .addCase(signInRequest.pending,(state,action)=>{
            state.error = null;
            state.loading = true
        })
        .addCase(signInRequest.fulfilled,(state,action)=>{
            state.error = null;
            if(action.payload.token){
                localStorage.setItem(TOKEN_KEY,action.payload.token)
                state.status = true
            }
        })
        .addCase(signInRequest.rejected,(state,action)=>{
            state.error = action.payload
            state.loading = false;
            console.log(action.payload );
        })
        .addCase(getUserInfo.pending,(state,action)=>{
            state.error = null;
            state.loading = true
        })
        .addCase(getUserInfo.fulfilled,(state,action)=>{
            state.error = null
            state.user = action.payload.user;
            state.loading = false
        })
        .addCase(getUserInfo.rejected,(state,action)=>{
            state.error = action.payload
            state.loading =false
            state.status= true
            console.log(action.payload);
        })
        .addCase(getAllUsers.pending,(state,action)=>{
            state.error = null;
            state.loading = true
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.error = null
            state.allUsers = action.payload
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.loading = false;
           state.error = action.payload;
        })
        .addCase(deleteUserByAdmin.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(deleteUserByAdmin.fulfilled,(state,action)=>{
            state.loading = false
            state.allUsers = state.allUsers.filter(user=> user.id !== action.payload)
        })
        .addCase(deleteUserByAdmin.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })   
    },reducers:{
        logout:(state)=>{
            state.user = null
            state.status = false
            localStorage.removeItem(TOKEN_KEY)
        }
    }
})


export const {logout} = authSlice.actions
export default authSlice.reducer