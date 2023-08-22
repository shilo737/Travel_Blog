import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";

const useUser = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logoutUser = () => {
    if(user){
      dispatch(logout());
      nav('/');
    }
  };

  return {
    user,
    logoutUser,
  };
};

export default useUser;
