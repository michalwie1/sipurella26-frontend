import { useForm } from 'react-hook-form'
// import { useTranslation } from 'react-i18next';
import { useReactMediaRecorder } from "react-media-recorder"

import { useState } from 'react';
// import { InputRecording } from 'Inp'


export function FormQuestions ({ question, register }) {
    // const { register, handleSubmit } = useForm()
    // const { sipurellatEv } = data;
    const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true })

let [recordingToggle, setRecordingToggle] = useState(true)
const [recording, setRecording] = useState(false);
const [audioBlob, setAudioBlob] = useState(null);

//     const onSubmit = (data) => {
//     onData(data);  
//     next();       
//   };

  const onRecordingToggle = () => {
    setRecordingToggle(!recordingToggle)
  }


    return (
      <section>
        <label htmlFor="info1">{question}</label>
        <div className='toggle' onClick={onRecordingToggle}>
          {`Toggle ${recordingToggle}`}
        </div>

        
      {recordingToggle 
      ?     <div>
      <p>Status: {status}</p>

      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>

      {mediaBlobUrl && (
        <audio src={mediaBlobUrl} controls />
      )}
    </div>
    //   ? <div className='recording'>
    //     <ReactMic
    //     record={recording}
    //     onStop={(blob) => setAudioBlob(blob)}
    //     mimeType="audio/webm"
    //     // strokeColor="#000000"
    //     // backgroundColor="#FF4081"
    // />
    //   <button type="button" onClick={() => setRecording(true)}>🎙️ התחל הקלטה</button>
    //   <button type="button" onClick={() => setRecording(false)}>⏹️ עצור</button>

    //   {audioBlob && (
    //     <div>
    //       <p>🔊 האזנה להקלטה</p>
    //       <audio controls src={audioBlob.blobURL}></audio>
    //     </div>
    //   )}

    //   </div>
    : 
    <div>
    <label htmlFor="storyInput">ספר לנו</label>
      <textarea
        id="storyInput"
        {...register("storyText")}
        rows="6"
        placeholder="כאן מספרים"
      />

    </div>
    }


</section>
    )

};

export default FormQuestions;
