import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderAdmin from "../../components/pages/admin/HeaderAdmin";

const LayoutAdmin = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  
  const isAdmin = () => {
    return user?.role === "admin";
  };

 

  return (
    <div className="">
      {isAdmin() ? (
        <HeaderAdmin />
      ) : (
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-red-600 text-[1.5em]">Error!</p>
            <p className="text-white text-[2.5em]">You are not an admin.</p>
            <button className="btn btn-info mt-3" onClick={() => nav("/")}>
              Go Home
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
