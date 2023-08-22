import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiDelete, apiGet, apiPost } from "../../services/services";
import { ADD_TRAVEL_AGENTS, DELETE_TRAVEL_AGENTS, GET_ALL_TRAVEL_AGENTS } from "../../constant/url";

export const getAllTravelAgents = createAsyncThunk(
    "travelAgents/getAllTravelAgents",
    async (bodyData ,thunkAPI) => {
      try {
        const { data } = await apiGet(GET_ALL_TRAVEL_AGENTS);
        return thunkAPI.fulfillWithValue(data);
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response);
      }
    }
  );

  export const addTravelAgents = createAsyncThunk(
    "travelAgents/addTravelAgents",async (bodyData, thunkAPI) => {
      try {
        console.log(bodyData);
          const {data} = await apiPost(ADD_TRAVEL_AGENTS,bodyData)
          return thunkAPI.fulfillWithValue(data)
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response)
      }
    }
  );

  export const deleteTravelAgents = createAsyncThunk(
    "travelAgents/deleteTravelAgents",async (bodyData, thunkAPI) => {
      try {
        console.log(bodyData);
          const {data} = await apiDelete(DELETE_TRAVEL_AGENTS+bodyData)
          return thunkAPI.fulfillWithValue(data)
      } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response)
      }
    }
  );


  const initialState = {
    travelAgents:[],
    loading:false,
    error:null
  }

  const travelAgentSlice = createSlice({
    name:"travelAgents",
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTravelAgents.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(getAllTravelAgents.fulfilled,(state,action)=>{
            state.loading = false
            state.travelAgents = action.payload
        })
        .addCase(getAllTravelAgents.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(addTravelAgents.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(addTravelAgents.fulfilled,(state,action)=>{
            state.loading = false
            state.travelAgents.unshift(action.payload)
        })
        .addCase(addTravelAgents.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(deleteTravelAgents.pending,(state,action)=>{
          state.loading = true
        })
        .addCase(deleteTravelAgents.fulfilled,(state,action)=>{
          state.loading = false
          state.travelAgents = state.travelAgents.filter(item=> item.id !== action.payload)
        })
        .addCase(deleteTravelAgents.rejected,(state,action)=>{
          state.loading = false
        })
    }
  })

  export default travelAgentSlice.reducer;