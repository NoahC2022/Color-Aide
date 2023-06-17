'use client'
import Image from 'next/image';
import React from 'react';
import Navbar from '../NavBar';
import { EyeDropper } from 'react-eyedrop';
import rainbow from '../assets/rainbow.jpeg';

import axios from "axios";
import { useState } from 'react';

//removed server code from here

export default function Home() {
  const [pickedColor, setPickedColor] = React.useState("#B19CD9");
  const getColor = ({ rgb, hex }) => {
    setPickedColor(hex);
    console.log(rgb, hex);

    //pass into my Chat GPT prompt & send it.



  };

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("None Yet");

  //prompt
  const promptHelper = "Please answer in three words or less, preferably less. Do not use commas or periods. Be creative, but descriptive. Come up with a name for this color: ";
  const submission = promptHelper + pickedColor;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

      console.log(submission);
  };
 return (
    <>
    <Navbar />
    <div className=' flex justify-center items-center h-screen" mx-6 my-6'>
        <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col'>
    <EyeDropper onChange={getColor} cursor={"grab"} className='flex flex-col rounded-lg shadow-lg'/>
      <div style={{ backgroundColor: pickedColor, height: "50px" }}
        className='rounded-lg shadow-lg p-4 items-center justify-center flex flex-col'>
      Target Color
      </div>
      <br />
        <button
            className='rounded-lg bg-green-500 drop-shadow-lg p-4 w-15 items-center justify-center'
            onClick={handleSubmit}>
        handleSubmit
        </button>
      <br />
      <button
            className='rounded-lg bg-green-500 drop-shadow-lg p-4 w-15 items-center justify-center'
            onClick={() => setPrompt(submission)}>
        setPrompt Submission
        </button>
      <br />
        <div
        className=' rounded-lg drop-shadow-lg p-4 w-15 items-center justify-center flex flex-col'
        style={{ backgroundColor: pickedColor, height: "20px"}}
        >
            { pickedColor }
        </div>
        <br />
        <div
        className=' rounded-lg drop-shadow-lg p-4 w-15 items-center justify-center flex flex-col'
        style={{ backgroundColor: pickedColor, height: "20px"}}
        >
            <p>{ response }</p>
        </div>
        <br />
      <div>
        <Image src={rainbow} alt="Rainbow" width={500} height={300} />
      </div>
      </div>
      </div>
      </>
 )
}