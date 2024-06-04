import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useUser from "./useUser";
import { TOKEN_KEY } from "../constant/url";
import {
  getUserInfo,
  signInRequest,
  signUpRequest,
  updateProfileImage,
} from "../redux/features/authSlice";

const useAuth = () => {
  const { loading, error, user, status } = useSelector(
    (store) => store.authReducer
  );
  const { logoutUser } = useUser();
  const dispatch = useDispatch();

  const singUp = (_bodyData) => {
    dispatch(signUpRequest(_bodyData));
  };

  const singIn = (_bodyData) => {
    dispatch(signInRequest(_bodyData));
  };

  const getUser = () => {
    dispatch(getUserInfo());
  };

  const changeProfileImage = (_bodyData) => {
    dispatch(updateProfileImage(_bodyData));
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      getUser();
    } else {
      logoutUser();
    }
  }, [status, localStorage[TOKEN_KEY]]);

  return {
    user,
    singIn,
    singUp,
    error,
    loading,
    status,
    getUser,
    changeProfileImage,
  };
};
export default useAuth;
