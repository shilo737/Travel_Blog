import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoleByAdmin, deleteUserByAdmin, getAllUsers } from "../redux/features/authSlice";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { loading, error, allUsers } = useSelector((store) => store.authReducer);
  const {user} = useAuth()
  const dispatch = useDispatch();
  const [refresh,setRefresh] = useState(false)

  const isAdmin = () => {
    return user?.role === "admin";
  };
  const getAllUser = () => {
    dispatch(getAllUsers());
  };

  const changeRole = (_idUser,_role) => { 
    const idUserAndRole = {
      _id:_idUser,
      role:_role
    }
    dispatch(changeRoleByAdmin(idUserAndRole))
    setRefresh(!refresh)
  }

  const deleteUsersByAdmin = (user_id) =>{
    dispatch(deleteUserByAdmin(user_id))
    setRefresh(!refresh)
  }

  return {
    allUsers,
    isAdmin,
    getAllUser,
    deleteUsersByAdmin,
    changeRole,
    refresh
  };
};

export default useAdmin;
