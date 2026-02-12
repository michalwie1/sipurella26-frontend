// UserForm.jsx
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { storyService } from '../services/story.service.js'
import { loadSip, updateSip } from '../store/actions/sip.actions';


export function UserComplete () {
const { sipId } = useParams()
const sip = useSelector(state => state.sipModule.sip)
// const [sip, setSip] = useState({})

useEffect(() => {
    console.log(sipId)
    if (!sip || sip._id !== sipId) {
        // const loadedSip = await sipService.getById(sipId)
        loadSip(sipId)
    }
}, [sipId])

useEffect(() => {
    console.log(sip)
    generateIfNeeded()
}, [sip])

 async function generateIfNeeded() {
     if (!sip?._id) return
     if (sip.story) return
     console.log('sip', sip)

    console.log('sip.story', sip.story)
    try {
    const story = await storyService.generate(sip)
    await updateSip({ ...sip, story })
    } catch (err) {
    console.error("Story generation failed", err)
    }
}

if (!sip) return <div>Loading...</div>

  return (
    <section className='user-complete'>
        <h1>הסיפור שלך מוכן</h1>
        <div>{sip.story}</div>
    </section>
  )
}
