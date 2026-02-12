import React, { useState, useEffect, useMemo } from "react"
import { useForm } from 'react-hook-form'
import { uploadService } from "../services/upload.service"



export function FormStep3 ({ onSubmit, addStepParam, back }) {

  const { register, handleSubmit } = useForm()
  const [images, setImages] = useState([])

  const [isUploading, setIsUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState("")

  useEffect(() => {
    addStepParam()
  }, [])

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validImages = fileArray.filter((file) => file.type.startsWith("image/"));

    // limit to 20 images
    const newImages = [...images, ...validImages].slice(0, 20);
    setImages(newImages);
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
    return images.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
  }, [images])

  // Cleanup previews
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [previews])

  // async function onFinalSubmit(data) {
  //   try {
  //     setUploadErr("")
  //     setIsUploading(true)

  //     // 1) upload to backend (which uploads to Cloudinary)
  //     const imgUrls = images.length ? await uploadImagesToServer(images) : []

  //     // 2) save URLs into sip (imgs array)
  //     await onSubmit({ ...data, imgs: imgUrls })
  //   } catch (err) {
  //     console.error(err)
  //     setUploadErr("Upload failed. Please try again.")
  //   } finally {
  //     setIsUploading(false)
  //   }
  // }

  async function onFinalSubmit(data) {
    const imgUrls = images.length ? await uploadService.uploadImages(images) : []
    await onSubmit({ ...data, imgs: imgUrls })
  }


    return (
 <section className="container user-form">
      <h1>Final Step</h1>

      {/* ✅ IMPORTANT: call onFinalSubmit, not onSubmit */}
      <form onSubmit={handleSubmit(onFinalSubmit)}>
        <div>
          <label htmlFor="wish">איחול</label>
          <textarea id="wish" {...register("wish")} rows="6" placeholder="איחול" />
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

        <section className="upload-box" onDragOver={(ev) => ev.preventDefault()} onDrop={handleDrop}>
          <label htmlFor="imgs" className="upload-area">
            <p>
              📸 Drag and drop up to 20 images here
              <br />
              or click to select from your computer
            </p>
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
        </section>

        {uploadErr && <p style={{ color: "red" }}>{uploadErr}</p>}

        <button type="submit" disabled={isUploading}>
          {isUploading ? "מעלה..." : "שליחה"}
        </button>

        {back && (
          <button type="button" onClick={back} disabled={isUploading}>
            חזרה
          </button>
        )}
      </form>
    </section>
    )

}

