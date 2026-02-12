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


// export function FormStep2_Questions({ question, register, setValue, watch }) {
//   const [recordingToggle, setRecordingToggle] = useState(true)

//   const fieldName = `inputStory_${question.id}`

//   const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
//     audio: true,
//     onStop: async (_blobUrl, blob) => {
//       try {
//         const url = await uploadService.uploadAudio(blob)
//         setValue(fieldName, url, { shouldDirty: true })
//       } catch (err) {
//         console.error(err)
//       }
//     },
//   })

//   return (
//     <section>
//       <label>{question.txt}</label>

//       <div className="toggle">
//         <button type="button" onClick={() => setRecordingToggle((t) => !t)}>
//           {`Toggle ${recordingToggle}`}
//         </button>
//       </div>

//       {recordingToggle ? (
//         <div>
//           <button type="button" onClick={startRecording}>Start</button>
//           <button type="button" onClick={stopRecording}>Stop</button>

//           {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
//         </div>
//       ) : (
//         <div>
//           <label htmlFor={fieldName}>ספר לנו</label>
//           <textarea
//             {...register(fieldName)}   {/* ✅ text goes into same field as audio URL */}
//             id={fieldName}
//             rows="6"
//             placeholder="כאן מספרים"
//           />

//         </div>
//       )}
//     </section>
//   )
// }

// export function FormStep2_Questions({ question, register, setValue, watch }) {
//   const fieldName = `inputStory_${question.id}`

//   const { startRecording, stopRecording } = useReactMediaRecorder({
//     audio: true,
//     onStop: async (_blobUrl, blob) => {
//       try {
//         const url = await uploadAudioToServer(blob)
//         setValue(fieldName, url, { shouldDirty: true }) // ✅ saved into sip later
//       } catch (err) {
//         console.error(err)
//       }
//     },
//   })

//   return (
//     <section>
//       <label>{question.txt}</label>
//       <button type="button" onClick={startRecording}>Start</button>
//       <button type="button" onClick={stopRecording}>Stop</button>

//       <textarea
//         {...register(fieldName)}
//         rows="6"
//         placeholder="כאן מספרים..."
//       />
//     </section>
//   )
// }
