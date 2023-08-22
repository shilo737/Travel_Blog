import React from "react";
import usePosts from "../../../hooks/usePosts";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PostInfoAndUser from "./PostInfoAndUser";
import { useForm } from "react-hook-form";
import { RiSendPlane2Fill } from "react-icons/ri";
import "../design/button.css";
import Weather from "../../apis/weather/Weather";
import useAuth from "../../../hooks/useAuth";

const PostInfo = () => {
  const {
    getMyPostById,
    postInfo,
    sendComment,
    refreshComment,
    deleteComment,
  } = usePosts();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const { user } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const maxDisplayLength = 500;
  const toggleTextVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  const onSub = (_bodyData) => {
    sendComment(id, _bodyData.body);
    reset();
    console.log(_bodyData);
  };

  const deleteCommentById = (_comment_id) => {
    deleteComment(id, _comment_id);
    console.log("delete");
  };

  useEffect(() => {
    getMyPostById(id);
  }, [refreshComment]);

  return (
    <div className=" text-white">
      {postInfo && (
        <div>
          <PostInfoAndUser postInfo={postInfo} />
          <div className="description container mx-auto mt-10 text-white">
            <div className="text-[2em] italic font-serif font-bold">
              {postInfo?.category} » {postInfo?.location} » {postInfo?.title}
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div className=" p-4 rounded-md">
                  <div
                    className={`leading-loose text-lg font-medium text-justify ${
                      isExpanded ? "" : "line-clamp-[24]"
                    }`}
                  >
                    {postInfo.description}
                  </div>
                  {postInfo.description?.length > maxDisplayLength && (
                    <button
                      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleTextVisibility}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="p-4 rounded-md">
                  <Weather postInfo={postInfo} />
                </div>
              </div>
            </div>

            <div className="carouselImg my-5 w-full lg:w-2/3">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
              >
                {postInfo.images?.map((img, i) => (
                  <img
                    key={i}
                    className="h-[33rem] w-full object-cover"
                    srcSet={`${img} 1080w, ${img} 720w, ${img} 480w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={img}
                    alt={`Image ${i}`}
                  />
                ))}
              </Carousel>
            </div>
          </div>
          <div className="Comments container mx-auto text-white py-5">
            <form onSubmit={handleSubmit(onSub)}>
              <div className="col-span-full relative py-14">
                {" "}
                <div className="mt-5 ">
                  <textarea
                    {...register("body", {
                      required: { value: true, message: "text is required" },
                      maxLength: { value: 300 },
                    })}
                    rows="4"
                    placeholder="Comments and questions..."
                    className="block w-1/2 bg-blue-400 rounded-md border-0 py-1.5 shadow-2xl ring-1 ring-inset ring-gray-300 placeholder:text-white p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 text-[1.1em]"
                  />
                </div>
                <div className="flex flex-row-reverse pb-8 absolute w-1/2">
                  {!errors.body && (
                    <button type="submit" className="shadow__btn btn-info">
                      <RiSendPlane2Fill color="white" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div className="comments">
              {user &&
                postInfo.comments?.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 py-5 flex items-center gap-5 text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start"
                  >
                    <div>
                      <img
                        className="rounded-full w-[5rem]"
                        src={item.user_id?.profileImage}
                        alt="profileImage"
                      />
                    </div>

                    <div className="bg-blue-500 rounded-full p-4">
                      <div className="flex justify-between items-center">
                        <p className="text-[1em] italic">{item.user_id.name}</p>
                        {user._id === item.user_id._id && (
                          <button onClick={() => deleteCommentById(item._id)}>
                            X
                          </button>
                        )}
                      </div>

                      <p className="text-[1.3em] font-bold">{item.body}</p>
                      {item.createdAt && (
                        <p className="absolute pt-5">
                          {Math.floor(
                            (new Date() - new Date(item.createdAt)) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          days ago
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
