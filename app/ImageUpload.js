import React, { useState } from 'react';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <h2 className="text-2xl mb-4">Upload an Image</h2>
      <div className=''>
      <input type="file" onChange={handleImageUpload} className="mb-4" />
        </div>
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Uploaded" className="max-w-xs mx-auto" />
        </div>
      )}
    </div>
  );
}
