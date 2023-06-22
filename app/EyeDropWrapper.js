import React, { useRef } from 'react';
import { EyeDropper } from 'react-eyedrop';
import { BsEyedropper } from 'react-icons/bs';

const EyedropperWrapper = React.forwardRef((props, ref) => {
  const eyedropperRef = useRef();

  const handleClick = () => {
    if (eyedropperRef.current) {
      eyedropperRef.current.click();
    }
  };

  return (
    <div className=' bg-yellow-200 p-2 shadow-lg rounded-lg flex items-center justify-center gap-2' onClick={handleClick}>
    <div className='h-4 w-6' />
      <EyeDropper {...props} ref={ref} forwardedRef={eyedropperRef}
        onChange={getColor} cursor={"grab"} pickRadius={dropperSize}
        className='flex flex-col rounded-lg shadow-lg'>
        < BsEyedropper className='' />
        <br />
        <h1 className='inline pr-20'> <b>Step 2.</b> Pick a Color</h1>
            <div className='h-4 w-2'></div>
      </EyeDropper>
    </div>
  );
});

export default EyedropperWrapper;
