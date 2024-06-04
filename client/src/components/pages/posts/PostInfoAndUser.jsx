import axios from "axios";
import React, { useEffect, useState } from "react";

const PostInfoAndUser = ({ postInfo }) => {
  const [country, setCountry] = useState({});

  const doApiCountry = async (country) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
  setCountry(data[0]);
    } catch (error) {
      console.error("Error fetching country data:", error.message);
    }
  };

  useEffect(() => {
    doApiCountry(postInfo?.location);
  }, [postInfo.location]);

  return (
    <div>
      <div>
        <div className="bg-gradient-to-br from-slate-500 to-indigo-800 shadow rounded">
          <div className="relative">
            <img
              className="h-72 shadow rounded-t w-full object-cover object-center"
              src={postInfo.main_image}
              alt="main_image"
            />
            <div className="inset-0 m-auto w-32 h-32 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
              <img
                className="w-full h-full overflow-hidden object-cover rounded"
                src={postInfo.user_id?.profileImage}
                alt="profile"
              />
            </div>
          </div>
          <div className="px-5 xl:px-10 pb-10">
            <div className="">
              <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
                <div className="xl:pr-16 w-full xl:w-2/3">
                  <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                    <h2 className="mb-3 xl:mb-0 mt-10 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                      {postInfo.user_id?.name}
                    </h2>
                    <div className="text-sm bg-indigo-700 dark:bg-indigo-600 text-white px-5 py-1 font-normal rounded-full sm:mt-10">
                      Pro
                    </div>
                  </div>
                  <div className="py-3 text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                  <p>Email : {postInfo.user_id?.email}</p>
                  </div>
                </div>
                <div className="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-1/3">
                  <div className="mr-6 xl:mr-10">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      {country.population?.toLocaleString()}
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Population
                    </p>
                  </div>
                  <div className="mr-6 xl:mr-10">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      {country.continents}
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Continent
                    </p>
                  </div>
                  <div>
                    <h2 className="text-gray-600  dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      {country.capital}
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Capital
                    </p>
                  </div>
                </div>
                <div className="w-full xl:w-2/3 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6">
                  <div className="flex items-center justify-center xl:justify-start mt-1 md:mt-0 mb-5 md:mb-0">
                    <div className="rounded-full bg-gray-200 text-gray-600 dark:text-gray-400 text-sm px-6 py-2 flex justify-center items-center">
                      <img
                        className="h-[7rem]"
                        src={country.coatOfArms?.png}
                        alt=""
                      />
                    </div>
                    <div className="ml-5 px-6 py-2 flex justify-center items-center">
                      <img
                        className="h-[7rem]"
                        src={country.flags?.png}
                        alt={country.flags?.alt}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="maps text-white flex justify-center">
                <a
                  href={country.maps?.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Google Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfoAndUser;
