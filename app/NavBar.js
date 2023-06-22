import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-lb1 py-4 px-6">
      <h1 className="text-white pr-2"><b>Colorblind Assistant</b></h1>
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white">Home</a></li>
        <li><a href="/blobs" className="text-white">Blobs</a></li>
        <li><a href="https://github.com/NoahC2022/Color-Aide"  target="_blank" rel="noopener noreferrer" className="text-white">Github</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
