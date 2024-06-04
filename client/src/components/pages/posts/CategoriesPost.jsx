import React from "react";
import usePosts from "../../../hooks/usePosts";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../pages/design/motion";

const CategoriesPost = ({ categoriesPost }) => {
  
  const continents = [
    "europe",
    "africa",
    "asia",
    "north america",
    "south america",
    "antarctica",
    "oceania",
  ];

  const searchByCategories = (_cat) => {
    categoriesPost(_cat);
  };
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={fadeIn("right", "tween", 0.5, 1)}>
          <div className="grid xl:grid-cols-7 sm:grid-cols-3 grid-cols-2 gap-5 justify-center">
            {continents.map((item, i) => (
              <div
                className="h-[9rem] w-[9rem] relative cursor-pointer opacity-70 kkhover:opacity-100 hover:animate-pulse"
                key={i}
                onClick={() => searchByCategories(item)}
              >
                <img
                  className="rounded-full w-full h-full"
                  src="https://img.freepik.com/free-vector/earth-map-linear-composition_1284-34070.jpg?size=626&ext=jpg&ga=GA1.2.1208200538.1686835925&semt=ais"
                  alt=""
                />
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-900 text-[1.5em] font-bold">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CategoriesPost;
