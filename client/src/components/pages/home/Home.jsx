import React from "react";

import HomeCard from "./HomeCard";
import ScrollImage from "./ScrollImage";

const Home = () => {
  return (
    <>
      <ScrollImage />
      <div className="hidden lg:block lg:h-[200vh]">
        <HomeCard />
      </div>
    </>
  );
};

export default Home;
