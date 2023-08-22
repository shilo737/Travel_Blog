import React, { useEffect, useState } from "react";
import "./cardPost.css";
import { FaPlane, FaHeart, FaRegHeart } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import usePosts from "../../../hooks/usePosts";

const CardPost = ({ post, toggleFavorite,setRefreshDeletePost}) => {
  const { main_image, createdAt, description, location, title, _id } =post;
  const { user } = useAuth();
  const {deletePost} = usePosts()
  const text = description.substring(0, 250) + "...";
  const nav = useNavigate();
  const [isFavorite, setIsFavorite] = useState(user?.favorite?.includes(_id))

  const deleteMyPost = (_id) => {
    if (!window.confirm("Are you sure you want to delete the blog?")) {
      return
    }
   deletePost(_id)
   setRefreshDeletePost(true)
  }
  
 return (
   
      <div className="containers">
        <div className="cards rounded-2xl">
          <div className="imgBox">
            <img className="rounded-2xl h-full" src={main_image} alt="" />
          </div>
          <div className="details">
            <h2 className="text-indigo-800 font-serif font-bold mb-2 text-[2rem]">
              {title}
            </h2>
            <p className="font-bold text-indigo-800 font-serif text-[1.3em]">
              Country : {location}
            </p>
            <p className="font-bold text-indigo-800 font-serif text-[1.1em] mt-2">
              Created : {createdAt.substring(0, 10)}
            </p>
            <div
              title={description}
              className="font-bold text-indigo-800 font-serif text-[1.1em] mt-2"
            >
              <Typewriter
                options={{
                  strings: text,
                  autoStart: true,
                  delay: 30,
                }}
              />
            </div>
          </div>
          <div className="absolute flex gap-2 right-2 bottom-2 text-indigo-800 text-[2em] cursor-pointer items-center">
            {user?.role === "admin" && <div className="text-red-500" onClick={()=>deleteMyPost(_id)}><svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg></div> }
            
            {user && user._id && (
              <div onClick={() => toggleFavorite(_id , ()=> setIsFavorite(prev=> !prev))}>
                {isFavorite ? <FaHeart color="red" /> :  <FaRegHeart color="red" />}
              </div>
            )}
            <div className="">
              <FaPlane color="blue" onClick={() => nav(`/postInfo/${_id}`)} />
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default CardPost;
