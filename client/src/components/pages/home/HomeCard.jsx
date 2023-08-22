import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { fadeIn, staggerContainer } from "../../pages/design/motion";
import usePosts from "../../../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import '../design/button.css'


const ExploreCountry = ({ country, image, index,id }) => {
  const nav = useNavigate()
  return (
    <motion.div onClick={()=>nav(`/postInfo/${id}`)}
      variants={fadeIn("right", "spring", index * 0.2, 0.75)}
      className="flex flex-col items-center justify-center"
    >
      <Tilt options={{ max: 35, scale: 1.2, speed: 250 }}>
        <img
          src={image}
          alt={country}
          className="rounded-full h-[28rem] w-[18rem] hover:cursor-pointer py-4"
        />
      </Tilt>
    </motion.div>
  );
};

const HomeCard = () => {
  const nav = useNavigate()
const { allPosts, error, posts, loading } = usePosts();
  useEffect(() => {
    allPosts();
  }, []);

  return (
    <div>
      {!error && !loading && (
        <div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <div className="mb-16 p-5"></div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {posts?.map((country, index) => {
                return (
                  <ExploreCountry
                    key={country._id}
                    image={country.main_image}
                    index={index}
                    id={country._id}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
      <div className="flex justify-center">
        <button onClick={()=>nav('/post')} className="shadow__btn mt-20 animate-bounce ">More blogs</button>
      </div>
    </div>
  );
};

export default HomeCard;
