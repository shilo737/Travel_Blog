import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const HeaderAdmin = () => {


  return (
    <div>
        <div className="container navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Admin</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Home</Link></li>
    </ul>
  </div>
  
</div>
    </div>
  )
}

export default HeaderAdmin