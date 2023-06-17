'use client'
import Image from 'next/image';
import React from 'react';
import Navbar from './NavBar';
import { EyeDropper } from 'react-eyedrop';
import rainbow from './assets/rainbow.jpeg';

import axios from "axios";
import { useState } from 'react';

//removed server code from here

export default function Home() {
  const [pickedColor, setPickedColor] = React.useState("#bada55");
  const getColor = ({ rgb, hex }) => {
    setPickedColor(hex);
    console.log(rgb, hex);
  };

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(prompt);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <EyeDropper onChange={getColor} cursor={"grab"} />
      <div style={{ backgroundColor: pickedColor, height: "50px" }}>
      I&apos;m changing colors!
      </div>
      <br />
      <div>
        <Image src={rainbow} alt="Rainbow" width={500} height={300} />
      </div>
      <br />
      <form className=' w-full justify-center text-center'
            onSubmit={handleSubmit}>
        <div className=' md-6'>
          <label className=' block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4'
          htmlFor=' inline-full-name' > Input goes here: </label>
        </div>
        <div className=' py-4'>
          <input
            className=' bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:text-black'
            type='text'
            value={ prompt }
            onChange={(e) => setPrompt(e.target.value)}
            />
        </div>
        <div>
          <button
            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            type='submit'
            >
              Submit
            </button>
        </div>
      </form>
      <div className='w-full items-center mt-4 text-black'>
        <p>{response}</p>
      </div>

    </>
  )
}
