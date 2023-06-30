import React, { useState } from 'react';
import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { push, ref as databaseRef } from 'firebase/database';
import { database } from './page';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    try {
      // Upload the image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      await uploadBytes(storageRef, file);

      // Get the image download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Save the image URL to the Firebase Realtime Database
      const imagesRef = databaseRef(database, 'images');
      const newImageRef = push(imagesRef);
      await newImageRef.set({ imageUrl: downloadURL });

      // Update the image URL state
      setImageUrl(downloadURL);

      // Reset the selected image
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <h2 className="text-2xl mb-4">Upload an Image</h2>
      <input type="file" onChange={handleImageUpload} className="mb-4" />

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" className="max-w-xs mx-auto" />
        </div>
      )}
    </div>
  );
}
