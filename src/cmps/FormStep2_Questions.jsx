import { useReactMediaRecorder } from "react-media-recorder"
import { useState } from 'react'
import { uploadService } from "../services/upload.service"

export function FormStep2_Questions ({ question, register, setValue, idx }) {
  const [recordingToggle, setRecordingToggle] = useState(true)
  const [previewUrl, setPreviewUrl] = useState("")

  const textPath = `details.${idx}.text`
  const recordPath = `details.${idx}.recordUrl`

  const onRecordingToggle = () => {setRecordingToggle(!recordingToggle)}

   const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl, blob) => {
      try {
        setPreviewUrl(blobUrl)
        const url = await uploadService.uploadAudio(blob)
        setValue(recordPath, url, { shouldDirty: true })
        setValue(textPath, "", { shouldDirty: true }) //optional
      } catch (err) {
        console.error(err)
      }
    },
  })

    async function onDeleteRecording() {
    try {
      setValue(recordPath, "", { shouldDirty: true }) 
      setPreviewUrl("")
    } catch (err) {
      console.error("Failed to delete recording", err)
    }
  }


  return (
    <section>
      <label htmlFor="info1">{question}</label>
      <div className='toggle'>
        <button type="button" onClick={onRecordingToggle}>{`Toggle ${recordingToggle}`}</button>
      </div>

      <input type="hidden" {...register(recordPath)} />

      
    {recordingToggle 
    ? <div>
        <button type="button" onClick={startRecording}>Start</button>
        <button type="button" onClick={stopRecording}>Stop</button>

        {previewUrl && (
          <>
          <audio src={previewUrl} controls />
          <button type="button" onClick={onDeleteRecording}>
                x
          </button>
          </>
        )}
      </div>
    : <div>
      <label htmlFor={textPath}>ספר לנו</label>
      <textarea
        id={textPath}
        {...register(textPath)}
        rows="6"
        placeholder="כאן מספרים"
      />
      </div>
    }


</section>
  )

}
