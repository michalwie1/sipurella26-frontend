// UserForm.jsx
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { storyService } from '../services/story.service.js'
import { loadSip, updateSip } from '../store/actions/sip.actions';

import { LOADING_START, LOADING_DONE } from '../store/reducers/system.reducer'

import { Loader } from "../cmps/Loader.jsx"


export function UserComplete () {
const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
const sip = useSelector(state => state.sipModule.sip)    
const { sipId } = useParams()

const dispatch = useDispatch()

useEffect(() => {
    console.log(sipId)
    if (!sip || sip._id !== sipId) {
        loadSip(sipId)
    }
}, [sipId])

useEffect(() => {
    generateStory()
}, [sip])

 async function generateStory() {
     if (!sip?._id) return
     if (sip.story) return
    try {
    dispatch({type: LOADING_START})

    const story = await storyService.generate(sip)

    dispatch({type: LOADING_DONE})
    } catch (err) {
    console.error("Story generation failed", err)
    }
}

if (!sip || isLoading) return <Loader text="בונים את הסיפורלה שלך..." />

  return (
    <section className='user-complete'>
        <h1>הסיפור שלך מוכן</h1>
        <div>{sip.story}</div>
    </section>
  )
}
