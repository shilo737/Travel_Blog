import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Layout from './layout/Layout';
import Logout from '../components/auth/Logout';
import SingUp from '../components/auth/SingUp';
import Login from '../components/auth/Login';
import LayoutAdmin from './layout/LayoutAdmin';
import PageNotFound from './PageNotFound';
import Posts from '../components/pages/posts/Posts';
import Home from '../components/pages/home/Home'
import ProfileUser from '../components/pages/user/ProfileUser';
import EditPost from '../components/pages/posts/EditPost';
import Favorite from '../components/pages/user/Favorite';
import PostInfo from '../components/pages/posts/PostInfo';
import SendEmail from '../components/apis/sendEmail/SendEmail';
import UsersList from '../components/pages/admin/UsersList';
import AllTravelAgents from '../components/pages/admin/travelAgents/AllTravelAgents';

const AppRouters = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home/>}/>
               
                //!USER
                <Route path='/signUp' element={<SingUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                
                //!POST
                <Route path='/post' element={<Posts/>}/>
                <Route path='/editPost' element={<EditPost/>}/>
                <Route path='/favorite' element={<Favorite/>}/>
                <Route path='/postInfo/:id' element={<PostInfo/>}/>
                <Route path='/profile' element={<ProfileUser/>}/>  

                <Route path='/sendEmail' element={<SendEmail/>}/> 
                <Route path='/guides' element={<AllTravelAgents/>}/>             
            </Route>

               //?ADMIN
            <Route path='/admin/' element={<LayoutAdmin/>}>
            <Route path='/admin/' element={<UsersList/>}/>

            </Route>

            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </Router>
  )
}

export default AppRouters