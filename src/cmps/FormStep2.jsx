import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FormStep2_Questions } from './FormStep2_Questions.jsx'


export function FormStep2 ({ onSubmit, addStepParam, back }) {
  
  // const { event } = data
  const [questions, setQuestions] = useState(
    [{id: 'q1', txt: "איך הכרתם?"},
      {id: 'q2', txt: "איזה סוג של זוג אתם? מה מספרים עליכם"},
      {id: 'q3', txt: "מה התחביבים שלכם? (ביחד ולחוד)"},
      {id: 'q4', txt: "יש עוד משהו שהיית רוצה לשתף? שמות חיבה, בדיחות פרטיות, סיפורים מצחיקים"},
    ]
  )
  const { handleSubmit, register, setValue, watch } = useForm({shouldUnregister: false})

  useEffect(() => {
            addStepParam()
    }, [])

  

    return (
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h2>The Questions</h2>
        {
          questions.map((question) => {
            return (
            <FormStep2_Questions
              key={question.id}
              question = {question}
              register={register}
              setValue={setValue}
              watch={watch}
            />)

          })
        }


    <button type="submit">המשך</button>
      </form>
    </section>
    )

}
