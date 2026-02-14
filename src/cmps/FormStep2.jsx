import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormStep2_Questions } from './FormStep2_Questions.jsx'


export function FormStep2 ({ onSubmit, addStepParam, back }) {
  
  // const { event } = data
  const [questions, setQuestions] = useState(
    ["איך הכרתם?", "איזה סוג של זוג אתם? מה מספרים עליכם", "מה התחביבים שלכם? (ביחד ולחוד)", "יש עוד משהו שהיית רוצה לשתף? שמות חיבה, בדיחות פרטיות, סיפורים מצחיקים"])

  const defaultValues = {
    details: [
      { text: "", recordUrl: "" },
      { text: "", recordUrl: "" },
      { text: "", recordUrl: "" },
      { text: "", recordUrl: "" },
    ],
  }


  const { handleSubmit, register, setValue } = useForm({shouldUnregister: false, defaultValues})

  useEffect(() => {
            addStepParam()
    }, [])

  

    return (
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>The Questions</h2>
        {
          questions.map((question, idx) => {
            return (
            <FormStep2_Questions
              key={idx}
              question = {question}
              register={register}
              setValue={setValue}
              idx={idx}
              // watch={watch}
            />)

          })
        }


    <button type="submit">המשך</button>
      </form>
    </section>
    )

}
