import React from 'react';

const Blob = ({ id, size, initialTop, initialLeft }) => {
  const style = {
    top: `${initialTop}%`,
    left: `${initialLeft}%`,
    backgroundColor: id,
    width: `${size}rem`,
    height: `${size}rem`,
  };

  return <div className="absolute rounded-full" style={style}></div>;
};

export default Blob;
