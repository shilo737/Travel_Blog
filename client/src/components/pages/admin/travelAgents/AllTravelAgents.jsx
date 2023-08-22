import React, { useEffect, useState } from "react";
import useTravelAgents from "../../../../hooks/useTravelAgents";
import AddTravelAgent from "./AddTravelAgent";
import useAdmin from "../../../../hooks/useAdmin";
import Modal from "../../../modal/Modal";
import Loading from "../../../../loading/Loading";
import useAuth from "../../../../hooks/useAuth";

const AllTravelAgents = () => {
  const { getAllAgents, loading, travelAgents, deleteAgent } =
    useTravelAgents();
  const [addTravelAgent, setAddTravelAgent] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();


  useEffect(() => {
    getAllAgents();
  }, [refresh]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="container flex justify-center mx-auto pt-16">
            <div>
              <p className="text-white text-[2em] text-center font-normal pb-3">
                Our Agents
              </p>
              <h1 className="xl:text-xl text-xl text-center text-white  pb-6 sm:w-4/6 w-5/6 mx-auto">
                Welcome to our online travel hub, where your wanderlust meets
                exceptional service! We're thrilled to introduce you to a
                handpicked selection of travel agents, each eager to transform
                your travel dreams into unforgettable journeys.
              </h1>
            </div>
          </div>
          <div className="">
            {user?.role === "admin" && (
              <div className="flex flex-col-reverse items-end py-5 mr-10">
                <button
                  onClick={() => setAddTravelAgent(true)}
                  className="shadow__btn ml-4 animate-bounce"
                >
                  Add Agent
                </button>
              </div>
            )}
          </div>
          <div className="w-full bg-gray-100 px-10 pt-10">
            <div className="container mx-auto">
              <div className="lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                {travelAgents.map((item, i) => (
                  <div
                    className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
                    key={i}
                  >
                    <div className="rounded overflow-hidden shadow-md bg-white">
                      <div className="absolute -mt-20 w-full flex justify-center">
                        <div className="h-32 w-32">
                          <img
                            src={item.profile}
                            alt="Agents"
                            className="rounded-full object-cover h-full w-full shadow-md"
                          />
                        </div>
                      </div>
                      <div className="px-6 mt-16">
                        <div className="font-bold text-3xl text-center pb-1 text-blue-500">
                          {item.name}
                        </div>
                        <div className="flex gap-3  fill-blue-500 justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                          </svg>
                          <p className="text-blue-500 font-bold">
                            {item.phone}
                          </p>
                        </div>
                        <p className="text-center text-gray-900 text-base py-3 font-sans text-[1.3em]">
                          {item.about}
                        </p>
                      </div>
                      {user?.role === "admin" && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              deleteAgent(item._id), setRefresh(!refresh);
                            }}
                            className=" text-red-500 py-3  hover:text-red-800"
                          >
                            {" "}
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {addTravelAgent && (
        <Modal open={addTravelAgent} setOpen={setAddTravelAgent}>
          <AddTravelAgent setAddTravelAgent={setAddTravelAgent} />
        </Modal>
      )}
    </>
  );
};

export default AllTravelAgents;
