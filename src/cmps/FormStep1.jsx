import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function FormStep1 ({ onSubmit, addStepParam }) {
  const { register, handleSubmit } = useForm()

  useEffect(() => {
          addStepParam()
  }, [])


  return (
  <section className="user-form1">
      <h1>שאלון קצרצר</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="giverName"></label>
        <input placeholder="נותן המתנה" {...register("giverName")} />
      </div>

          <div>
        <label htmlFor="email"></label>
        <input
          placeholder="כתובת מייל"
          type="email"
          {...register("email")}
        />
      </div>

      <div>
        <label htmlFor="receiverName"></label>
        <input placeholder="מקבל המתנה" {...register("receiverName")} />
      </div>

      <div>
        <label htmlFor="relation"></label>
        <input placeholder="מה הקשר ביניכם?" {...register("relation")} />
      </div>

      <div>
        <label htmlFor="event"></label>
        <select id="event"  {...register("event")} name="event">
          
          <option value="" style={{display:"none"}}>איזה אירוע?</option>
          <option value="ev1">יום הולדת</option>
          <option value="ev1">חתונה</option>
          <option value="ev1">אירוסין</option>
          <option value="ev1">בר/בת מצווה</option>
          <option value="ev1">יום נישואין</option>
          <option value="ev1">הריון</option>
          <option value="ev1">לידה</option>
          <option value="ev1">אחר</option>
      </select>
      </div>

    
      <button type="submit">המשך</button>
    </form>
  </section>
  )

}
