import React from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../loading/Loading";
import MyPosts from "./MyPosts";
import Resizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import { apiPost } from "../../../services/services";
import { UPLOAD_IMAGE } from "../../../constant/url";

const ProfileUser = () => {
  const { user, loading,error,changeProfileImage } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (resizedImage) => {
          resolve(resizedImage);
        },
        "blob",
        500,
        500,

        (error) => {
          reject(error);
        }
      );
    });
  };
const onSub = async( _bodyData) =>{
  try {
    const img = await resizeImage(_bodyData.profileImage[0]);
    if (img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = async () => {
        const imgData = reader.result;
        try {
          const data = await apiPost(UPLOAD_IMAGE, { myFile: imgData });
          if (data) {
            console.log(data);
            delete _bodyData.profileImage;
            _bodyData.profileImage = data.data.secure_url;
            if (!error) {
              console.log("work");
              changeProfileImage(_bodyData)
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    }
  } catch (error) {
    console.log(error);
  }
}
  
  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full relative shadow-2xl rounded  overflow-hidden">
          <div className="h-[340px] w-full bg-blue-600 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
              alt=""
              className="bg w-full h-full object-cover object-center absolute z-0"
            />
            <div className="relative flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white">
              <img
                src={user?.profileImage}
                className="h-32 w-32 object-cover rounded-full"
              />
              <div className="flex rounded-full absolute ml-28 mt-10">
                <form action="" onSubmit={handleSubmit(onSub)}>
                <label className="flex cursor-pointer  appearance-none items-center justify-center rounded-full  transition-all hover:border-primary-300">
                    <div className="space-y-1 text-center">
                      <div className="mx-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 42 42"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.515 7A4.25 4.25 0 0 0 16.8 9.186L15.514 11.5H11.75A5.75 5.75 0 0 0 6 17.25v17A5.75 5.75 0 0 0 11.75 40h11.246a12.899 12.899 0 0 1-.756-2.5H11.75a3.25 3.25 0 0 1-3.25-3.25v-17A3.25 3.25 0 0 1 11.75 14h5.235l2-3.6a1.75 1.75 0 0 1 1.53-.9h6.97a1.75 1.75 0 0 1 1.53.9l2 3.6h5.235a3.25 3.25 0 0 1 3.25 3.25v5.55c.882.325 1.72.744 2.5 1.244V17.25a5.75 5.75 0 0 0-5.75-5.75h-3.764L31.2 9.186A4.25 4.25 0 0 0 27.485 7h-6.97ZM24 17a8.003 8.003 0 0 1 7.586 5.453c-.815.221-1.598.52-2.34.887a5.5 5.5 0 1 0-6.4 7.039c-.294.772-.517 1.58-.66 2.415A8 8 0 0 1 24 17Zm22 18c0 6.075-4.925 11-11 11s-11-4.925-11-11s4.925-11 11-11s11 4.925 11 11Zm-10-6a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5v-5Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input  {...register("profileImage", { required: true })}
                      accept="image/*"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <button type="submit" className="">Change</button>
                </form>
                  
                </div>
              <h1 className="text-2xl font-semibold mt-7">{user?.name}</h1>
              <h4 className="text-xl font-semibold">Blogger</h4>
            </div>
          </div>
          <div className="grid grid-cols-12 text-white hover:bg-blue-900">
            <div className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
              <a
                href="#"
                className="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold"
              >
                Basic Information
              </a>
            </div>
            <div className="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10 ">
              <div className="px-4 pt-4 ">
                <div>
                  <h3 className="text-2xl font-semibold">Basic Information</h3>
                  <hr />
                </div>
                <div className="grid grid-cols-2 my-5">
                  <div className="form-item">
                    <label className="text-xl ">Full Name</label>
                    <p className="text-2xl">{user?.name}</p>
                  </div>
                  <div className="form-item">
                    <label className="text-xl ">Email</label>
                    <p>{user?.email}</p>
                  </div>

                  <div className="form-item my-5">
                    <label className="text-xl">Join Date</label>
                    <p>{user?.createdAt.substring(0, 10)}</p>
                  </div>
                  <div className="form-item my-5">
                    <label className="text-xl">My Blogs</label>
                    <p>{user?.posts.length}</p>
                  </div>
                </div>
              </div>
              <div>
                <MyPosts />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
