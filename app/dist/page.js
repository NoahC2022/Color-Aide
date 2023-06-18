'use client'
import Image from 'next/image';
import React from 'react';
import Navbar from '../NavBar';
import ImageUploader from '../ImageUpload';
import { EyeDropper } from 'react-eyedrop';
import tinycolor from 'tinycolor2';
import { mostReadable } from 'tinycolor2';
import rainbow from '../assets/rainbow.jpeg';
import loadingImage from '../assets/ellipse-loading.gif'
import { BsEyedropper } from 'react-icons/bs';
import BeatLoader from "react-spinners/BeatLoader";

import { useState, CSSProperties } from "react";
import { Configuration, OpenAIApi } from 'openai'

const mySecret = process.env['GPT_KEY'];

const config = new Configuration({
  apiKey: mySecret,
});

const openai = new OpenAIApi(config);

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};



//removed server code from here

export default function Home() {
  const [pickedColor, setPickedColor] = React.useState("#B19CD9");
  const [textColor, setResponseTextColor] = useState('');
  const getColor = ({ rgb, hex }) => {
    setPickedColor(hex);
    console.log(rgb, hex);
    console.log(dropperSize);

    const complementaryColor = tinycolor(hex).complement().toHexString();
    console.log("Complementary Color: " + complementaryColor);
    const readability = tinycolor.readability(pickedColor, complementaryColor);
    // console.log("Readability (1-21): " + readability);

    let textColor = tinycolor.mostReadable(pickedColor, [pickedColor, complementaryColor], {
      includeFallbackColors: true,
      level: 'AA',
      size: 'small'
    }).toHexString();

    console.log("Readability B : " + tinycolor.readability(pickedColor, textColor));


    // if (tinycolor.readability(pickedColor, textColor) < 3) {
    //   const replaceColor = "ffffff"
    // }

    console.log("Readability B : " + tinycolor.readability(pickedColor, textColor));

    setResponseTextColor(textColor);
    console.log("Text Color: ");
  };

  const [dropperSize, setDropperSize] = React.useState(1);
  const handleDropperSize = (size) => {
    setDropperSize(size);
  }

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("Blissful Lavender");

  const [loading, setLoading] = useState(false);


  const getCompletion = async () => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0.5,
      prompt: prompt,
    });

    console.log(completion)
    setLoading(false);

    setResponse(completion.data.choices[0].text)

    return completion.data.choices[0].text
  }

  //prompt
  const promptHelper = "Please answer in three words or less, preferably less. Do not use commas or periods. Be creative, but descriptive. Come up with a name for this color: ";
  const submission = promptHelper + pickedColor;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const result = getCompletion();
    console.log(result);
  };
  return (
    <>
      <Navbar />
      <div className=' flex justify-center items-center h-screen" mx-6 my-6'>
        <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col'>
          <div className=' items-center justify-center flex flex-col'>
            <ImageUploader />
            <br />
          </div>
          <div className=' bg-yellow-200 p-2 shadow-lg rounded-lg flex items-center justify-center gap-2'>
            <div className='h-4 w-6'></div>
            <EyeDropper
              onChange={getColor} cursor={"grab"} pickRadius={dropperSize}
              className='flex flex-col rounded-lg shadow-lg'>
              < BsEyedropper className='' />
            </EyeDropper>
            <br />
            <h1 className='inline pr-20'> <b>Step 2.</b> Pick a Color</h1>
            <div className='h-4 w-2'></div>
          </div>
          {/* <div style={{ backgroundColor: pickedColor, height: "50px" }}
            className='rounded-lg shadow-lg p-4 items-center justify-center flex flex-col'>
            Target Color
          </div>
          <br /> */}
          <br />
          <button
            className='rounded-lg bg-blue-200 drop-shadow-lg p-4 w-15 mx-17 items-center justify-center'
            onClick={() => setPrompt(submission)}>
            <b>Step 3.</b> Lock n Load Color
          </button>
          <br />
          <button
            className='rounded-lg bg-green-500 drop-shadow-lg p-4 w-15 items-center justify-center'
            onClick={handleSubmit}>
            <b>Step 4. </b>Name my Color!
          </button>
          <br />
          <div
            className=' rounded-full drop-shadow-lg p-4 w-30 h-30 mx-40 justify-center'
            style={{ backgroundColor: pickedColor, height: "20px" }}
          >
          </div>
          <p className=' justify-center items-center flex flex-col pt-4'> {pickedColor} </p>
          {/* <div
            className=' rounded-full drop-shadow-lg p-4 pb-4 mx-40 w-30 h-30 items-center justify-center flex'
            style={{ backgroundColor: pickedColor, color: "#00000", height: "20px" }}
          /> */}
          <div className=''>
            <h1 className='justify-center items-center flex flex-col text-lg'> <b>{response}</b> </h1>
          </div>
          {loading && (
            <div className='flex items-center justify-center mt-4 pt-1'>
              <BeatLoader color='#808080' loading={true} size={24} />
              <span className='ml-2'>Hmm...</span>
            </div>
          )}
          <div className=' flex justify-center flex-row pt-5 space-x-4'>
            <button className=' bg-blue-600 rounded-xl px-3'
              onClick={() => handleDropperSize(1)}> s </button>
            <button className=' bg-green-600 rounded-xl px-3'
              onClick={() => handleDropperSize(2)}> M </button>
            <button className=' bg-red-600 rounded-xl px-3'
              onClick={() => handleDropperSize(20)}> L </button>
          </div>
          <br />
        </div>
      </div>
    </>
  )
}