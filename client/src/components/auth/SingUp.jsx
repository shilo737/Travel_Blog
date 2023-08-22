import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/simgUp-login.jpg";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { apiPost } from "../../services/services";
import { UPLOAD_IMAGE } from "../../constant/url";
const SingUp = () => {
  const [hide, setHide] = useState(true);
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const { error, singUp, user, loading } = useAuth();
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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

  const onSub = async (_bodyData) => {
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
                singUp(_bodyData);
                reset();
                nav("/login");
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
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 backdrop-blur-sm">
          <div className="w-full bg-white rounded-lg shadow-2xl shadow-cyan-700 dark:border md:mt-0   sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-600 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up
              </p>
              <form
                onSubmit={handleSubmit(onSub)}
                className="space-y-4 md:space-y-6"
              >
                {error && <p className="m-0 text-red-600">{error}</p>}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name "
                  />
                  {errors.name && (
                    <p className="m-0 text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    {...register("email", {
                      required: { value: true, message: "email is required" },
                      pattern: { value: emailReg, message: "invalid email" },
                    })}
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="m-0 text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      minLength: { value: 6, message: "min 6 chars..." },
                      maxLength: { value: 200, message: "max 200 chars..." },
                    })}
                    type={hide ? "password" : "text"}
                    name="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="m-0 text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        onChange={() => setHide(!hide)}
                        type="checkbox"
                        aria-describedby="remember"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Show password
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center rounded-full">
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
                      {...register("profileImage", { required: true })}
                      accept="image/*"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingUp;
