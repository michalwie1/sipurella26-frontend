import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { uploadService } from "../services/upload.service"
import { LOADING_START, LOADING_DONE } from '../store/reducers/system.reducer'

import { Loader } from "./Loader"

export function FormStep3 ({ onSubmit, addStepParam, back }) {
  const sip = useSelector(storeState => storeState.sipModule.sip)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const { register, handleSubmit } = useForm()
  const [images, setImages] = useState([])

  const [isUploading, setIsUploading] = useState(false)
  const [uploadErr, setUploadErr] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    addStepParam()
  }, [])

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    const validImages = fileArray.filter((file) => file.type.startsWith("image/"))


    // limit to 20 images
    const newImages = [...images, ...validImages].slice(0, 20);
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


  async function onFinalSubmit(data) {
    dispatch({type: LOADING_START})
    const imgUrls = images.length ? await uploadService.uploadImages(images) : []
    await onSubmit({ ...data, imgs: imgUrls })

    dispatch({type: LOADING_DONE})
    navigate(`/complete/`)
    // navigate(`/complete/${sip._id}`)
  }

  if (isLoading) return <Loader />


    return (
 <section className="container user-form">
      <h1>Final Step</h1>

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

