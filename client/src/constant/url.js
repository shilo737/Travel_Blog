const API_URL = 'http://localhost:3004/';

export const TOKEN_KEY = 'token';

//? auth
export const  REGISTER_ROUTE = API_URL+'users'
export const LOGIN_ROUTE = API_URL+'users/login'
export const CHECK_TOKEN = API_URL+'users/checkToken';

//!ADMIN
export const GET_ALL_USERS = API_URL+'users/usersList'
export const DELETE_USER = API_URL+'users/'
export const CHANGE_ROLE = API_URL+'users/changeRole/'


//!USER
export const USER_INFO_ROUTE = API_URL+'users/userInfo'
export const CHANGE_IMAGE = API_URL+'users/updateProfileImage'


//?POSTS
export const GET_ALL_POSTS = API_URL+'posts/';
export const GET_MY_POSTS = API_URL+'posts/myPosts'
export const GET_POSTS_INFO = API_URL+'posts/postInfo/'
export const ADD_POST = API_URL+'posts'
export const EDIT_POST = API_URL +'posts/'
export const DELETE_POST = API_URL +'posts/'
export const GET_MY_FAVORITE = API_URL+'posts/favorite'
export const ADD_FAVORITE = API_URL+'posts/favorite/'
export const ADD_COMMENT = API_URL+'posts/comment/'
export const DELETE_COMMENT = API_URL+'posts/deleteComment/'

export const UPLOAD_IMAGE = API_URL+'uploads/cloud_server'

//* TravelAgents
export const GET_ALL_TRAVEL_AGENTS = API_URL+'travelAgents/'
export const ADD_TRAVEL_AGENTS = API_URL+'travelAgents'
export const DELETE_TRAVEL_AGENTS = API_URL+'travelAgents/'



