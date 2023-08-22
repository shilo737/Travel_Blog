import React, { useEffect, useRef } from "react";
import "./scrollImage.css";
import OpeningText from "./OpeningText";

const ScrollImage = () => {
  const mountainLeftRef = useRef(null);
  const mountainRightRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const textRef = useRef(null);
  const manRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      mountainLeftRef.current.style.left = `-${value / 0.7}px`;
      cloud2Ref.current.style.left = `-${value * 2}px`;
      mountainRightRef.current.style.left = `${value / 0.7}px`;
      cloud1Ref.current.style.left = `${value * 2}px`;
      textRef.current.style.bottom = `-${value}px`;
      manRef.current.style.height = `${window.innerHeight - value}px`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section id="travelImage">
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/bg.jpg"
          id="bg"
          alt="Mountains background"
        />
        <h2 id="text" ref={textRef}>
          Travel blog
        </h2>
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/man.png"
          id="man"
          alt="Man"
          ref={manRef}
        />
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/clouds_1.png"
          id="clouds_1"
          alt="Cloud 1"
          ref={cloud1Ref}
        />
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/clouds_2.png"
          id="clouds_2"
          alt="Cloud 2"
          ref={cloud2Ref}
        />
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/mountain_left.png"
          id="mountain_left"
          alt="Left mountain"
          ref={mountainLeftRef}
        />
        <img
          src="https://aryan-tayal.github.io/Mountains-Parallax/mountain_right.png"
          id="mountain_right"
          alt="Right mountain"
          ref={mountainRightRef}
        />
      </section>
      <section className="secText">
        <h2>Welcome to Travel blog</h2>
        <OpeningText />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,96L48,85.3C96,75,192,53,288,69.3C384,85,480,139,576,170.7C672,203,768,213,864,192C960,171,1056,117,1152,101.3C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </>
  );
};

export default ScrollImage;
