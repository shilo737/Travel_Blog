import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, travelVariants } from "../../pages/design/motion";
import earth from "../../../assets/earth.json";
import Lottie from "lottie-react";
import Footer from '../Footer'
const HomeImg = () => {
  return (
    <section>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container mx-auto mt-16 flex md:flex-row flex-col items-center gap-10"
      >
        <motion.div variants={fadeIn("left", "tween", 0.7, 3)}>
          <p className="text-white text-[2.8em] font-serif italic text-justify">
            <br />Our site features blogs from over 100 countries. Explore diverse perspectives, cultures and stories from around the world.
          </p>
        </motion.div>

        <motion.div variants={travelVariants("right",0.7)}>
          <div className="w-[50rem]">
            <Lottie  animationData={earth}/>
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomeImg;
