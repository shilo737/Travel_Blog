import React from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  staggerContainer,
} from "../../pages/design/motion";

const OpeningText = () => {
  return (
    <div>
      <section>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
        >
          <motion.div variants={fadeIn("right", "tween", 0.5,1)}>
            <p className="">
              Discover a vast collection of blogs written by passionate
              travelers, unveiling hidden gems
              <br />
              <br />
              Connect with a vibrant community of like-minded travelers, where
              you can exchange recommendations, seek travel advice, and build
              lasting friendships based on shared wanderlust.
              <br />
              <br />
              Whether you've conquered towering mountains, wandered through
              bustling cities, or immersed yourself in untouched natural
              wonders, Traveling Pen is your platform to showcase the magic of your
              travel tales.
              <br />
              <br />
              Experience the thrill of discovery as you search for blogs and
              delve into the rich tapestry of global adventures. Uncover
              off-the-beaten-path locations and embrace the diversity that our
              world has to offer.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn("left", "tween", 0.5, 1)}>
          <p>
          <br />
          Traveling Pen is more than just a website—it's a dynamic hub for
          travelers to gather, connect, and ignite their passion for
          exploration. Join us and become part of a supportive community that
          celebrates the joy of travel.
          <br />
          <br />
          Start your adventure today. Grab your pen, unleash your wanderlust,
          and let Traveling Pen be your trusted companion on every step of your
          travel journey. Happy exploring!
        </p>
          </motion.div>
        </motion.div>
       
      </section>
    </div>
  );
};

export default OpeningText;
