import React, { useState, useEffect, useMemo } from "react"

import { uploadService } from '../services/upload.service'

export function ImgUploader({ images = [], setImages, inputId, multiple = true, limit = 20 }) {
    const [uploadErr, setUploadErr] = useState("")

     const handleFiles = (files) => {
        const fileArray = Array.from(files)
        const validImages = fileArray.filter((file) => file.type.startsWith("image/"))
    

        const newImages = [...images, ...validImages].slice(0, limit);
        setImages(newImages)
      }
    
      const handleDrop = (ev) => {
        ev.preventDefault();
        handleFiles(ev.dataTransfer.files);
      }
    
      const handleSelect = (ev) => {
        handleFiles(ev.target.files);
      }
    
      const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
      }
    
      const previews = useMemo(() => {
        if (Array.isArray(images)) {
            return images.map((file) => ({
              file,
              url: URL.createObjectURL(file),
            }))
        }
        else return images
      }, [images])
    
      // Cleanup previews
      useEffect(() => {
        return () => {
          previews.forEach((p) => URL.revokeObjectURL(p.url))
        }
      }, [previews])
  


  return (
    <section className="upload-box" onDragOver={(ev) => ev.preventDefault()} onDrop={handleDrop}>
          <label htmlFor={inputId} className="upload-area">
            <p>
              📸 Drag and drop up to {limit} images here
              <br />
              or click to select from your computer
            </p>
            <input
                id={inputId}
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleSelect}
                style={{ display: "none" }}
            />
          </label>

          
          <div className="preview-grid">
            {previews.map((p, idx) => (
              <div key={p.url} className="preview-item">
                <img src={p.url} alt={`preview-${idx}`} className="preview-img" />
                <button type="button" className="remove-btn" onClick={() => removeImage(idx)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          {images.length >= 20 && <p className="limit-msg">You can upload up to 20 images only.</p>}
          {uploadErr && <p style={{ color: "red" }}>{uploadErr}</p>}
        </section>
  )
}