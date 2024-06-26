import React, { useEffect, useState } from "react";

import Modal from "../../modal/Modal";
import EditPost from "../posts/EditPost";
import Loading from "../../../loading/Loading";
import usePosts from "../../../hooks/usePosts";

const MyPosts = () => {
  const {
    loading,
    myPost,
    getMyPostUser,
    setCurrent,
    currentPost,
    deletePost,
  } = usePosts();

  const [editPost, setEditPost] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    getMyPostUser();
  }, [toggleEdit]);

  const handelEdit = (item) => {
    setCurrent(item);
    setEditPost(true);
  };

  const deleteMyPost = (_id) => {
    if (!window.confirm("Are you sure you want to delete the post?")) {
      return;
    }
    deletePost(_id);
    setToggleEdit(!toggleEdit);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center text-[3em] font-serif py-5 underline">
        <p>My Blogs</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {myPost.map((item) => (
            <div className="p-3" key={item._id}>
              <div className="card card-side bg-base-100 shadow-xl h-[60vh]">
                <figure>
                  <img
                    className="h-full w-[25rem]"
                    src={item.main_image}
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h1 className="card-title italic font-serif">{item.title}</h1>
                  <h2>Country : {item.location}</h2>
                  <h2>CreatedAt : {item.createdAt.substring(0, 10)}</h2>
                  <p title={item.description}>
                    {item.description.substring(0, 100)}...
                  </p>

                  <div className="card-actions flex justify-between">
                    <div className="sm:grid sm:grid-cols-3 lg:grid-cols-4  gap-3 hidden">
                      {item.images.map((img, i) => (
                        <div key={i}>
                          <img
                            className="h-[10rem] w-[10rem] rounded-3xl"
                            src={img}
                            alt={`Image ${i}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute flex gap-3 right-2 bottom-4">
                      <button
                        className="btn btn-error"
                        onClick={() => deleteMyPost(item._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handelEdit(item)}
                        className="btn btn-info"
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editPost && (
        <Modal open={editPost} setOpen={setEditPost}>
          <EditPost
            setEditPost={setEditPost}
            currentPost={currentPost}
            setToggleEdit={setToggleEdit}
            toggleEdit={toggleEdit}
          />
        </Modal>
      )}
    </div>
  );
};

export default MyPosts;
