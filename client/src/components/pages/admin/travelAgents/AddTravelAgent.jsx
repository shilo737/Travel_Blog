import React from "react";
import { useForm } from "react-hook-form";
import useTravelAgents from "../../../../hooks/useTravelAgents";
import Resizer from "react-image-file-resizer";
import { apiPost } from "../../../../services/services";
import { UPLOAD_IMAGE } from "../../../../constant/url";

const AddTravelAgent = ({setAddTravelAgent}) => {
  const { loading,error,addAgents } = useTravelAgents();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const fullName = /^[A-Za-z]+\s+[A-Za-z]+$/;

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


const onSub = async (_bodyData) =>{ 
 try {
      const img = await resizeImage(_bodyData.profile[0]);
      if (img) {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = async () => {
          const imgData = reader.result;
          try {
            const data = await apiPost(UPLOAD_IMAGE, { myFile: imgData });
            if (data) {
              delete _bodyData.profile;
              _bodyData.profile= data.data.secure_url;
             
              if (!error) {
                addAgents(_bodyData)
                reset();
                setAddTravelAgent(false)
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
    <div>
      <form
        onSubmit={handleSubmit(onSub)}
        className="bg-blue-500 rounded-3xl pt-6 pb-8  p-4 font-bold"
      >
        {error && <p className="m-0 text-red-600">{error}</p>}
        <div className="flex justify-center">
          <p className="text-3xl italic font-serif font-bold text-white mb-4">
            Add Travel Agent
          </p>
        </div>
        <div>
          <label className="block text-white text-lg font-bold mt-3">
            Full Name
          </label>
          <input
            {...register("name", {
              required: { value: true, message: "name is required" },
              pattern: {
                value: fullName,
                message: "Please enter full name...",
              },
              maxLength: { value: 30 },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            placeholder="name "
          />
          {errors.name && (
            <p className="m-0 text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-white text-lg font-bold mt-3 ">
            Phone number
          </label>
          <input
            {...register("phone", {
              required: { value: true, message: "phone is required" },
              maxLength: { value: 20 },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            placeholder="phone"
          />
          {errors.phone && (
            <p className="m-0 text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-white text-lg font-bold mt-3">
            About
          </label>
          <input
            {...register("about", {
              required: { value: true, message: "about is required" },
              maxLength: { value: 200 },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight bg-white"
            placeholder="about"
          />
          {errors.about && (
            <p className="m-0 text-red-600">{errors.about.message}</p>
          )}
        </div>
        <div className="flex justify-center rounded-full my-6">
          <label className="flex cursor-pointer h-[9rem] w-[9rem] appearance-none items-center justify-center rounded-full border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div className="space-y-1 text-center">
              <div className="mx-auto inline-flex h-28 w-28 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-20 w-20 text-gray-500"
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
            <input
              {...register("profile", {validate: (value) => {
                if (!value[0]) {
                  return "Image is required";
                }
                return true;
              },})}
              accept="image/*"
              type="file"
              className="sr-only"
            />
           
          </label>
          
        </div>
        {errors.profile && (<p className="mt-5 text-red-600">{errors.profile.message}</p> )}
        <button
          type="submit"
          className="w-full text-white  bg-blue-500 rounded-full border hover:bg-blue-300"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTravelAgent;
