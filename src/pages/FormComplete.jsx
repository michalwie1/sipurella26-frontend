import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { storyService } from '../services/story.service.js'
import { loadSip, updateSip } from '../store/actions/sip.actions.js';

import { LOADING_START, LOADING_DONE } from '../store/reducers/system.reducer.js'
import { SET_SIP } from '../store/reducers/sip.reducer.js'

import { Loader } from "../cmps/Loader.jsx"
import { ImagePrompts } from "../cmps/ImagePrompts.jsx"


export function FormComplete () {
const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
const sip = useSelector(state => state.sipModule.sip)    
const { sipId } = useParams()
const isStoryReady = Array.isArray(sip?.story) && sip.story.length >= 10;


const dispatch = useDispatch()

useEffect(() => {
    console.log(sipId)
    if (!sip || sip._id !== sipId) {
        loadSip(sipId)
    }
}, [sipId])

useEffect(() => {
    generateStory()
}, [sip?._id, sip?.story])


 async function generateStory() {
    if (!sip?._id) return
    if (sip.story) return
    try {
        dispatch({type: LOADING_START})

        const updateSip = await storyService.generate(sip._id)
        dispatch({ type: SET_SIP, sip: updateSip })


        dispatch({type: LOADING_DONE})
    } catch (err) {
        console.error("Story generation failed", err)
    }
}


if (!sip || isLoading) return <Loader text="בונים את הסיפורלה שלך..." />

  return (
    <section className='form-complete'>
       <div className='story-generate'>
        <h1>הסיפור של {sip.receiverName}</h1>
        <pre>Front Cover</pre>
        <hr></hr>
        {Array.isArray(sip.story) &&          
            sip.story.map((paragraph, idx) => (
            <pre key={idx} className="paragraph">
                {paragraph}
                <hr></hr>
            </pre>
            ))
           }
        <pre>{sip.backCover}</pre>
        <hr></hr>
        </div>

        {isStoryReady 
            ? <ImagePrompts sipId={sip._id} />
            : <Loader text="בונים את הסיפורלה שלך..." />
        }

    </section>
  )
}
