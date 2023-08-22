import React from 'react'
import { apiGet } from '../../services/services';
import { CHECK_TOKEN } from '../../constant/url';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';

const AuthUser = () => {
   const {logoutUser} = useUser()
    const checkToken = async () => {
      try {
        const {data} = await apiGet(CHECK_TOKEN)
        console.log(data);
      } catch (err) {
        if (err){
          logoutUser()
        }
      }
    }

    useEffect(()=>{
      checkToken()
    },[])
  return (
    <>
    
    
    </>
  )
}

export default AuthUser