'use client'
import React, { useState, CSSProperties, useEffect } from 'react';
import Navbar from './NavBar';
import ImageUploader from './ImageUpload';
import { EyeDropper } from 'react-eyedrop';
import tinycolor from 'tinycolor2';
import { BsEyedropper } from 'react-icons/bs';
import BeatLoader from "react-spinners/BeatLoader";
import { saveAs } from 'file-saver';
import fs from 'fs';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

import { Configuration, OpenAIApi } from 'openai';

const firebaseConfig = {
  apiKey: "AIzaSyCEGIwwDLGK9_FpRcfq6ykC3KtP3Gmw3wc",
  authDomain: "color-database-30d88.firebaseapp.com",
  projectId: "color-database-30d88",
  storageBucket: "color-database-30d88.appspot.com",
  messagingSenderId: "251213654731",
  appId: "1:251213654731:web:94fb400e6fe3021386494e",
  measurementId: "G-N41DWS5K43"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const openAIAPI = process.env.NEXT_PUBLIC_OPENAI_API;
console.log(openAIAPI);

const config = new Configuration({
  apiKey: openAIAPI,
});

const openai = new OpenAIApi(config);

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

// const saveDataToSpreadsheet = async (pickedColor, response) => {
//   try {
//     await axios.post('./saveData', { pickedColor, response });
//     console.log('Data logged successfully');
//   } catch (error) {
//     console.error('Error logging data: ', error);
//   }
// };

//removed server code from here

export default function Home() {
  let runs = 0;
  const [isPromptSet, setIsPromptSet] = useState(false);
  const [pickedColor, setPickedColor] = React.useState("#B19CD9");
  const [color, setColor] = useState(tinycolor(pickedColor));
  const [lightColor, setLightColor] = useState(color.darken(8).toHexString());
  const [darkColor, setDarkColor] = useState(color.lighten(10).toHexString());

  const getColor = ({ rgb, hex }) => {
    console.log(runs);
    console.log("Picked Color A" + pickedColor);
    console.log("DarkHex A: " + darkColor);
    console.log("LightHex A: " + lightColor);
    runs++;
    if (runs < 20) {
      setPickedColor(hex);
      const updatedColor = tinycolor(hex);
      setColor(updatedColor);
      setDarkColor(updatedColor.darken(8).toHexString());
      setLightColor(updatedColor.lighten(20).toHexString());
      setResponse("<b>Unidentified Color</b>\n<i>Unknown</i>");
    }
  };

  useEffect(() => {
    console.log("Picked Color: " + pickedColor);
    console.log("DarkHex: " + darkColor);
    console.log("LightHex: " + lightColor);
  }, [pickedColor, darkColor, lightColor]);

  useEffect(() => {
    if (isPromptSet) {
      handleSubmit();
      setIsPromptSet(false);
    }
  }, [isPromptSet]);

  useEffect(() => {
    if (response !== "<b>Blissful Lavender</b>\n<i>Purple</i>") {
      const saveDataToFirebase = async () => {
        try {
          const colorDataRef = ref(database, 'colorData');
          const newColorData = push(colorDataRef);
          await set(newColorData, {
            pickedColor,
            response
          });
          console.log('Data saved successfully');
        } catch (error) {
          console.error('Error saving data: ', error);
        }
      };
      
      saveDataToFirebase();
    }
  }, [response]);
  

  const [dropperSize, setDropperSize] = React.useState(1);
  const handleDropperSize = (size) => {
    setDropperSize(size);
  }

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("<b>Blissful Lavender</b>\n<i>Purple</i>");

  const [loading, setLoading] = useState(false);

  const getCompletion = async () => {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0.3,
      prompt: prompt,
    });

    console.log(completion)
    setLoading(false);

    setResponse(completion.data.choices[0].text);

    console.log("Response" + completion.data.choices[0].text);
    return completion.data.choices[0].text;
  }

  const promptHelper = "Prompt 1: Return a name for this color. Refer to existing names from sites like color-hex, before coming up with your own- prefer existing names. Please answer with two to three words when naming. Add <b> tags around your answer, then a single newline character after. Prompt 2: Then, use two words to accurately identify the color using: light, dark, yellowish, blueish, redish, greyish for the first word and- blue, yellow, green, red, orange, purple, brown, pink, grey, black, or white for the second word. Include 1-3 asterisks by your answer to assert your confidence on the basic name. Wrap the answer in <i> tags. Do NOT use ANY commas or periods. Do not re-use any Prompt 2 words in Prompt 1's answer. Be creative, but descriptive for Prompt 1: ";
  const submission = promptHelper + pickedColor;

  const handleSubmit = async () => {
    //e.preventDefault();
    setLoading(true);
    const result = await getCompletion();
    console.log(result);
  };

  const handleClick = () => {
    setPrompt(submission);
    setIsPromptSet(true);
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
            <div className='h-4 w-6' />
            <EyeDropper
              onChange={getColor} cursor={"grab"} pickRadius={dropperSize} once={false}
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
          {/* <button
            className='rounded-lg bg-blue-200 drop-shadow-lg p-4 w-15 mx-17 items-center justify-center'
            onClick={() => setPrompt(submission)}>
            <b>Step 3.</b> Lock n Load Color
          </button> */}
          <button
            className='rounded-lg bg-green-500 drop-shadow-lg p-4 w-15 items-center justify-center'
            onClick={handleClick}>
            <b>Step 3. </b>Name my Color!
          </button>
          <br />
          <div className='h-500 w-500'>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient
                  id="fill1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  gradientTransform="rotate(118 0.5 0.5)"
                >
                  <stop offset="0%" stopColor={darkColor} />
                  <stop offset="100%" stopColor={lightColor} />
                </linearGradient>
              </defs>
              <path
                stroke="none"
                strokeWidth="0"
                fill="url(#fill1)"
                d="M87,65Q74,80,58,83.5Q42,87,24.5,79Q7,71,8,50.5Q9,30,24,17Q39,4,56,12.5Q73,21,86.5,35.5Q100,50,87,65Z"
              >
                <animate
                  attributeName="d"
                  dur="20s"
                  repeatCount="indefinite"
                  values="M87,65Q74,80,58,83.5Q42,87,24.5,79Q7,71,8,50.5Q9,30,24,17Q39,4,56,12.5Q73,21,86.5,35.5Q100,50,87,65Z;
                    M84,65Q74,80,58,82.5Q42,85,29,75.5Q16,66,11.5,47.5Q7,29,24,20.5Q41,12,60,13Q79,14,86.5,32Q94,50,84,65Z;
                    M86,65Q74,80,58,82.5Q42,85,29,75.5Q16,66,17,50Q18,34,28.5,18.5Q39,3,56.5,11.5Q74,20,86,35Q98,50,86,65Z;
                    M83,68Q79,86,59,91.5Q39,97,28,81.5Q17,66,11.5,47.5Q6,29,23,17Q40,5,56,14Q72,23,79.5,36.5Q87,50,83,68Z;
                    M89.5,68.5Q80,87,61,86Q42,85,27,76.5Q12,68,12.5,50Q13,32,27.5,23Q42,14,57.5,17.5Q73,21,86,35.5Q99,50,89.5,68.5Z;
                    M81.5,67.5Q78,85,58.5,91Q39,97,28,81.5Q17,66,17,50Q17,34,29,22.5Q41,11,57,16Q73,21,79,35.5Q85,50,81.5,67.5Z;
                    M87,65Q74,80,58,83.5Q42,87,24.5,79Q7,71,8,50.5Q9,30,24,17Q39,4,56,12.5Q73,21,86.5,35.5Q100,50,87,65Z"
                />
              </path>
            </svg>
          </div>
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
          <div className='justify-center items-center flex flex-col'>
            <h1 style={{ textAlign: 'center' }}
              dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, "<br>") }}>
            </h1>
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