import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiDelete, apiGet, apiPost, apiPut } from "../../services/services";
import { ADD_COMMENT, ADD_POST, DELETE_POST, EDIT_POST, GET_ALL_POSTS, GET_MY_POSTS, GET_POSTS_INFO } from "../../constant/url";

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (bodyData ,thunkAPI) => {
    try {
      let data; 
      if (bodyData) {
        ({ data } = await apiGet(GET_ALL_POSTS + bodyData));
      } else {
        ({ data } = await apiGet(GET_ALL_POSTS));
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const getInfoPost = createAsyncThunk(
  "post/getInfoPost",async (bodyData, thunkAPI) => {
    try {
        const {data} = await apiGet(GET_POSTS_INFO+bodyData)
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);


export const getMyPosts = createAsyncThunk(
  "post/getMyPosts",async (bodyData, thunkAPI) => {
    try {
        const {data} = await apiGet(GET_MY_POSTS)
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);
export const addPosts = createAsyncThunk(
  "post/addPosts",async (bodyData, thunkAPI) => {
    try {
      console.log(bodyData);
        const {data} = await apiPost(ADD_POST,bodyData)
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);
export const upDatePosts = createAsyncThunk(
  "post/editPosts",async (bodyData, thunkAPI) => {
    try {
        const {data} = await apiPut(EDIT_POST+bodyData._id, bodyData.body)
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);
export const deletePosts = createAsyncThunk(
  "post/deletePosts",async (bodyData, thunkAPI) => {
    try {
        const {data} = await apiDelete(DELETE_POST+bodyData)
        console.log(data);
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",async (bodyData, thunkAPI) => {
    try {
        const {data} = await apiPost(ADD_COMMENT+bodyData)
        console.log(data);
        return thunkAPI.fulfillWithValue(data)
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response)
    }
  }
);

const initialState = {
  posts: [],
  postInfo :{},
  myPost:[],
  loading: false,
  error: null,
  currentPost:null
};
const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers:(builder)=>{
  builder
  .addCase(getAllPosts.pending,(state,action)=>{
    state.loading = true;
  })
  .addCase(getAllPosts.fulfilled,(state,action)=>{
    state.loading = false;
    state.posts = action.payload;
  })
  .addCase(getAllPosts.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(getInfoPost.pending,(state,action)=>{
    state.loading = true;
  })
  .addCase(getInfoPost.fulfilled,(state,action)=>{
    state.loading = false;
    state.postInfo = action.payload;
  })
  .addCase(getInfoPost.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload;
  })
  
  .addCase(getMyPosts.pending,(state,action)=>{
    state.loading = true;
  })
  .addCase(getMyPosts.fulfilled,(state,action)=>{
    state.loading = false;
    state.myPost = action.payload;
  })
  .addCase(getMyPosts.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(addPosts.pending,(state,action)=>{
    state.loading=true
  })
  .addCase(addPosts.fulfilled,(state,action)=>{
    state.loading = false;
    state.posts.unshift(action.payload)
  })
  .addCase(addPosts.rejected,(state,action)=>{
    state.loading = false
    state.error = action.payload
  })
  .addCase(upDatePosts.pending,(state,action)=>{
    state.loading = true
    
  })
  .addCase(upDatePosts.fulfilled,(state,action)=>{
    state.loading = false
    state.posts.forEach((post,i)=>{
      if(post._id=== action.payload._id){
        state.posts[i] = action.payload
      }
    })
  })
  .addCase(upDatePosts.rejected,(state,action)=>{
    state.loading = false
    state.error = action.payload
  })
  .addCase(deletePosts.pending,(state,action)=>{
    state.loading = true
  })
  .addCase(deletePosts.fulfilled, (state, action) => {
    state.loading = false;
    state.posts = state.posts.filter(post => post.id !== action.payload);
  })
  
  .addCase(deletePosts.rejected,(state,action)=>{
    state.loading = false
    state.error = action.payload
  })
 
  
  
  
  },
  reducers: {
    setCurrentPost:(state,action)=>{
      state.currentPost = action.payload
    }

  },
});
export const {setCurrentPost} = postSlice.actions
export default postSlice.reducer;
