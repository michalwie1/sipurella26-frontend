import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'

// import { submitStory } from './services/sipurella.service.js';



export function FormStep3 ({ onSubmit, addStepParam, back }) {

    const { register, handleSubmit } = useForm()
    const [images, setImages] = useState([]);
    

  useEffect(() => {
            addStepParam()
    }, [])

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validImages = fileArray.filter((file) => file.type.startsWith("image/"));

    // limit to 20 images
    const newImages = [...images, ...validImages].slice(0, 20);
    setImages(newImages);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    handleFiles(ev.dataTransfer.files);
  };

  const handleSelect = (ev) => {
    handleFiles(ev.target.files);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

//   const handleFinalSubmit = async () => {
//   try {
//     const response = await submitStory({
//       fields: data,     
//     })
//     console.log('✅ Server response:', response);
//   } catch (err) {
//     alert('Something went wrong 😢');
//   }
// }


    return (
    <section className="container user-form">
        <h1>Final Step</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
           <label htmlFor="wish">איחול</label>
            <textarea
              id="wish"
              {...register("wish")}
              rows="6"
              placeholder="איחול"
            />
        </div>

         <div>
           <label htmlFor="backCover">משפט לכריכה אחורית</label>
            <textarea
              id="backCover"
              {...register("backCover")}
              rows="6"
              placeholder="משפט לכריכה"
            />
        </div>

      <section
      className="upload-box"
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={handleDrop}
    >
      <label htmlFor="imgs" className="upload-area">
        <p>📸 Drag and drop up to 20 images here<br />or click to select from your computer</p>
        <input
          id="imgs"
          type="file"
          accept="image/*"
          multiple
          onChange={handleSelect}
          style={{ display: "none" }}
        />
      </label>

      <div className="preview-grid">
        {images.map((img, idx) => (
          <div key={idx} className="preview-item">
            <img
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="preview-img"
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeImage(idx)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {images.length >= 20 && <p className="limit-msg">You can upload up to 20 images only.</p>}
    </section>



        {/* <input type="submit" /> */}
        <button type="submit">שליחה</button>
        {/* <button onClick={handleFinalSubmit}>שליחה</button> */}

      </form>
    </section>)

}

