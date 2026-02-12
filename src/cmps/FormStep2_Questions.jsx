import { useReactMediaRecorder } from "react-media-recorder"
import { useState } from 'react'
import { uploadService } from "../services/upload.service"



export function FormStep2_Questions ({ question, register, setValue, watch }) {
  // const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({ audio: true })
  const [recordingToggle, setRecordingToggle] = useState(true)
  const fileName = `storyInput_${question.id}`

  const onRecordingToggle = () => {
    setRecordingToggle(!recordingToggle)
  }

   const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (_blobUrl, blob) => {
      try {
        const url = await uploadService.uploadAudio(blob)
        setValue(fileName, url, { shouldDirty: true })
      } catch (err) {
        console.error(err)
      }
    },
  })

  return (
    <section>
      <label htmlFor="info1">{question.txt}</label>
      <div className='toggle'>
        <button type="button" onClick={onRecordingToggle}>{`Toggle ${recordingToggle}`}</button>
      </div>

      
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
      <label htmlFor={fileName}>ספר לנו</label>
      <textarea
        id={fileName}
        {...register(fileName)}
        rows="6"
        placeholder="כאן מספרים"
        // value=""
      />
      </div>
    }


</section>
  )

}
