import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 py-4 px-6">
      <h1 className="text-white">Colorblind Assistant</h1>
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white">Home</a></li>
        <li><a href="/test" className="text-white">ChatGPT</a></li>
        <li><a href="/dist" className="text-white">Test</a></li>
        <li><a href="/blobs" className="text-white">Blob</a></li>
        <li><a href="https://github.com/NoahC2022"  target="_blank" rel="noopener noreferrer" className="text-white">Github</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
