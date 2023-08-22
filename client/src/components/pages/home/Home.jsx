import React, { useEffect, useState } from "react";
import HomeImg from "./HomeImg";
import HomeCard from "./HomeCard";
import ScrollImage from "./ScrollImage";

const Home = () => {
  return (
    <>
     <ScrollImage/>
     <div className="hidden lg:block lg:h-[200vh]">
     <HomeCard/>
     </div>
    </>
  );
};

export default Home;
