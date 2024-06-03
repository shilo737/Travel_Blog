import SendEmail from "../components/apis/sendEmail/SendEmail";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import SingUp from "../components/auth/SingUp";
import AllTravelAgents from "../components/pages/admin/travelAgents/AllTravelAgents";
import UsersList from "../components/pages/admin/UsersList";
import Home from "../components/pages/home/Home";
import EditPost from "../components/pages/posts/EditPost";
import PostInfo from "../components/pages/posts/PostInfo";
import Posts from "../components/pages/posts/Posts";
import Favorite from "../components/pages/user/Favorite";
import ProfileUser from "../components/pages/user/ProfileUser";
import Layout from "../routes/layout/Layout";
import LayoutAdmin from "../routes/layout/LayoutAdmin";
import PageNotFound from "../routes/PageNotFound";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "", element: <Home /> },
      { path: "signUp", element: <SingUp /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "post", element: <Posts /> },
      { path: "editPost", element: <EditPost /> },
      { path: "favorite", element: <Favorite /> },
      { path: "postInfo/:id", element: <PostInfo /> },
      { path: "profile", element: <ProfileUser /> },
      { path: "sendEmail", element: <SendEmail /> },
      { path: "guides", element: <AllTravelAgents /> },
    ],
  },
  {
    path: "/admin/",
    element: <LayoutAdmin />,
    children: [{ index: true, path: "", element: <UsersList /> }],
  },
  { path: "*", element: <PageNotFound /> },
];
