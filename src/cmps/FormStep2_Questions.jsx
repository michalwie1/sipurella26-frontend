import { useReactMediaRecorder } from "react-media-recorder"
import { useState } from 'react';


export function FormStep2_Questions ({ question, register }) {
  // const { sipurellatEv } = data;
  const {status, startRecording, stopRecording, mediaBlobUrl} = useReactMediaRecorder({ audio: true })
  const [recordingToggle, setRecordingToggle] = useState(true)

  const onRecordingToggle = () => {
    setRecordingToggle(!recordingToggle)
  }

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
      <label htmlFor={`storyInput_${question.id}`}>ספר לנו</label>
      <textarea
        id={`storyInput_${question.id}`}
        {...register(`storyInput_${question.id}`)}
        rows="6"
        placeholder="כאן מספרים"
        // value=""
      />
      </div>
    }


</section>
  )

}
