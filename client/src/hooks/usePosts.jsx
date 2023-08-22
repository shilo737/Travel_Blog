import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getMyPosts,
  addPosts,
  setCurrentPost,
  upDatePosts,
  deletePosts,
  getInfoPost,
} from "../redux/features/postSlice";
import { apiDelete, apiPatch, apiPost } from "../services/services";
import { ADD_COMMENT, ADD_FAVORITE, DELETE_COMMENT } from "../constant/url";

const usePosts = () => {
  const { posts, loading, error, currentPost, myPost, postInfo } = useSelector(
    (store) => store.postReducer
  );
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [refreshComment,setRefreshComment] = useState(false)
  const [refreshPost,setRefreshPost] = useState(false)

          
  const allPosts = () => {
    dispatch(getAllPosts());
  };
  const pagesPosts = (_num) => {
    dispatch(getAllPosts("?page=" + _num));
  };

  const categoriesPost = (_name) =>{
    dispatch(getAllPosts("?category="+_name))
  }

  const getMyPostById = (_id) => {
    dispatch(getInfoPost(_id));
  };

  const searchPosts = (_search) => {
    dispatch(getAllPosts("?s="+_search));
  };

  const getMyPostUser = () => {
    dispatch(getMyPosts());
  };

  const addNewPosts = (bodyData) => {
    dispatch(addPosts(bodyData));
    setRefreshPost(!refreshPost)
  };
  const setCurrent = (post) => {
    dispatch(setCurrentPost(post));
  };

  const editPosts = (bodyData) => {
    dispatch(upDatePosts(bodyData));
  };

  const deletePost = (_id) => {
    dispatch(deletePosts(_id));
  };

  const toggleFavorite = async (_id, cb) => {
    const { data } = await apiPatch(ADD_FAVORITE + _id);
    setRefresh(!refresh);
    if(cb) cb()
  };

  const sendComment = async (_id ,_bodyComment) => {
    const { data } = await apiPost(ADD_COMMENT + _id,{body:_bodyComment});
    setRefreshComment(!refreshComment)
  };

  const deleteComment = async (_id,comment_id)=> {
    const { data } = await apiDelete(`${DELETE_COMMENT}${_id}/${comment_id}`);
    setRefreshComment(!refreshComment)
  }

  return {
    posts,
    myPost,
    getMyPostUser,
    allPosts,
    loading,
    error,
    addNewPosts,
    refreshPost,
    setCurrent,
    currentPost,
    editPosts,
    deletePost,
    toggleFavorite,
    refresh,
    pagesPosts,
    searchPosts,
    categoriesPost,
    getMyPostById,
    postInfo,
    sendComment,
    deleteComment,
    refreshComment,
  };
};

export default usePosts;
