import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePosts from "../../../hooks/usePosts";

const EditPost = ({setEditPost,currentPost,setToggleEdit,toggleEdit}) => {
  const { error, loading } = usePosts();
  const {setCurrent,editPosts} = usePosts()
  const { _id, category, description, location, main_image, title} = currentPost;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = async (_bodyData) => {
    const data = {
      body: _bodyData,
      _id
    };
    try { 
      await editPosts(data);
      if (!error) {
        setCurrent(null);
        setToggleEdit(!toggleEdit)
        setEditPost(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

   
 
  return (
    <div className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit(onSub)}
        className="bg-blue-500 rounded-3xl pt-6 pb-8  p-4 font-bold"
      >
        <div className="flex justify-center">
          <p className="text-3xl italic font-serif font-bold text-white">
            Edit Post
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Title
          </label>
          <input
          defaultValue={title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight  bg-white"
            type="text"
            placeholder="Enter Title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Location
          </label>
          <input
          defaultValue={location}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter location"
            {...register("location", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Image URL
          </label>
          <input
          defaultValue={main_image}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter image URL"
            {...register("main_image", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-bold mb-2">
            Continent
          </label>
          <select
            defaultValue={category}
            {...register("category")}
            className="border font-bold text-sm text-black rounded block w-full p-2.5 bg-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="north america">North America</option>
            <option value="south america">South America</option>
            <option value="antarctica">Antarctica</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-white text-lg font-bold mb-2">
            Description
          </label>
          <textarea
            rows="7"
            defaultValue={description}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            type="text"
            placeholder="Enter description"
            {...register("description", { required: true })}
          />
        </div>
        <div className="flex items-center w-fit mx-auto">
          <button
            className="bg-blue-700 mx-2 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
          <button
            onClick={()=>setEditPost(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
