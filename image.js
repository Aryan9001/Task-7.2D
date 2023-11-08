import React, { useState } from 'react';
import { storage } from './Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './image.css';

function Image() {
  const [imageUpload, setImageUpload] = useState(null);

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const uploadImage = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        alert('Image Uploaded!');
      })
      .catch((error) => {
        console.error('Error uploading image: ', error);
      });
  };

  return (
    <div className="image-container">
      <label className="upload-button" htmlFor="file-upload">
        Choose Image
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={uploadImage}>
        Upload Image
      </button>
      {imageUpload && (
        <div className="image-preview">
          <h3>Selected Image:</h3>
          <p>{imageUpload.name}</p>
        </div>
      )}
    </div>
  );
}

export default Image;
