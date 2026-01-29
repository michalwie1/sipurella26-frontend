import { useForm } from 'react-hook-form'
// import { useReactMediaRecorder } from "react-media-recorder";

import { useState } from 'react';
import FormQuestions from './FormQuestions';
// import InputText from './InputText';
// import InputRecording from './InputRecording';
// import RecordingToggle from './RecordingToggle';


export function FormStep2 ({ next, back, data, onData }) {
    const { register, handleSubmit } = useForm()
    // const { t } = useTranslation('form');
    const { sipurellatEv } = data;

    const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ audio: true })

let [recordingToggle, setRecordingToggle] = useState(true)
const [recording, setRecording] = useState(false);
const [audioBlob, setAudioBlob] = useState(null);
// const questions = t('questions', { returnObjects: true });

    const onSubmit = (data) => {
    onData(data);  
    next();       
  };

  const onRecordingToggle = () => {
    setRecordingToggle(!recordingToggle)
  }



    return (
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>The Questions</h2>
        {
          questions.map((question, idx) => {
            return (
            <FormQuestions
              key={idx}
              register = {register}
              question = {question} 
            />)

          })
        }
         {/* <div className='toggle' onClick={onRecordingToggle}>
          {`Toggle ${recordingToggle}`}
        </div> */}

       {/* <div> */}
        {/* <recordingToggle
          recordingToggle = {recordingToggle}
          onRecordingToggle = {onRecordingToggle} /> */}
        {/* <label htmlFor="info1">what</label>
        {recordingToggle ? <InputRecording /> : <InputText />}
       </div> */}


    <button type="submit">המשך</button>
      </form>
    </section>
    )

};

export default FormStep2;
