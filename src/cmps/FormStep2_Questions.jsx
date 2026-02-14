import { useReactMediaRecorder } from "react-media-recorder"
import { useState } from 'react'
import { uploadService } from "../services/upload.service"



export function FormStep2_Questions ({ question, register, setValue, idx }) {
  // const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({ audio: true })
  const [recordingToggle, setRecordingToggle] = useState(true)

  const textPath = `details.${idx}.text`
  const recordPath = `details.${idx}.recordUrl`

  const onRecordingToggle = () => {
    setRecordingToggle(!recordingToggle)
  }

   const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (_blobUrl, blob) => {
      try {
        const url = await uploadService.uploadAudio(blob)
        setValue(recordPath, url, { shouldDirty: true })
        setValue(textPath, "", { shouldDirty: true }) //optional
      } catch (err) {
        console.error(err)
      }
    },
  })


  return (
    <section>
      <label htmlFor="info1">{question}</label>
      <div className='toggle'>
        <button type="button" onClick={onRecordingToggle}>{`Toggle ${recordingToggle}`}</button>
      </div>

      {/* Ensure recordUrl is part of the form submit even if UI is toggled */}
      <input type="hidden" {...register(recordPath)} />

      
    {recordingToggle 
    ? <div>
        {/* <p>Status: {status}</p> */}
        <button type="button" onClick={startRecording}>Start</button>
        <button type="button" onClick={stopRecording}>Stop</button>

        {mediaBlobUrl && (
          <audio src={mediaBlobUrl} controls />
        )}
      </div>
    : <div>
      <label htmlFor={textPath}>ספר לנו</label>
      <textarea
        id={textPath}
        {...register(textPath)}
        rows="6"
        placeholder="כאן מספרים"
        // value=""
      />
      </div>
    }


</section>
  )

}
