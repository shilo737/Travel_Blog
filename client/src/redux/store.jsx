import {configureStore} from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import postReducer from './features/postSlice'
import travelAgentReducer from './features/travelAgentSlice'

const myStore = configureStore({
    reducer:{
    authReducer,
    postReducer,
    travelAgentReducer,
    }
})

export default myStore