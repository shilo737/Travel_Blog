import React, { useEffect, useState } from 'react';
import './card.css';

const Cards = () => {
  const [showBoxes, setShowBoxes] = useState([]);

  useEffect(() => {
    checkBoxes();
    window.addEventListener('scroll', checkBoxes);
    return () => {
      window.removeEventListener('scroll', checkBoxes);
    };
  }, []);
  const checkBoxes = () => {
    const triggerBottom = window.innerHeight / 5*4;
    const updatedShowBoxes = Array.from(document.querySelectorAll('.box')).map((box) => {
      const boxTop = box.getBoundingClientRect().top;
      return boxTop < triggerBottom;
    });
    setShowBoxes(updatedShowBoxes);
  };
  return (
    <div className=''>
      <div className="apps grid grid-cols-3 ">
      <div className={`box ${showBoxes[0] ? 'show' : ''} bg-blue-500 hover:animate-bounce`}>content</div>
      <div className={`box ${showBoxes[1] ? 'show' : ''} bg-red-500 hover:animate-bounce`}>content</div>
      <div className={`box ${showBoxes[2] ? 'show' : ''} bg-purple-500 hover:animate-bounce`}>content</div>
      </div>
    </div>
  );
};

export default Cards;
