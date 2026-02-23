import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { storyService } from '../services/story.service.js'
import { loadSip, updateSip } from '../store/actions/sip.actions.js';

import { LOADING_START, LOADING_DONE } from '../store/reducers/system.reducer.js'
import { SET_SIP } from '../store/reducers/sip.reducer.js'

import { Loader } from "../cmps/Loader.jsx"
import { CardPreview } from "../cmps/CardPreview.jsx"
import { ImagePrompts } from "../cmps/ImagePrompts.jsx"


export function FormComplete () {
const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
const sip = useSelector(state => state.sipModule.sip)    
const { sipId } = useParams()
const isStoryReady = Array.isArray(sip?.story) && sip.story.length >= 10;
const [storyDraft, setStoryDraft] = useState([])


const dispatch = useDispatch()

 const labels = useMemo(() => {
    const arr = []
    arr.push("Front Cover")
    for (let i = 1; i <= 10; i++) arr.push(`Paragraph ${i}`)
    arr.push("Wish")
    arr.push("Back cover")
    return arr
  }, [])

useEffect(() => {
    if (!sip || sip._id !== sipId) {
        loadSip(sipId)
    }
}, [sipId])

useEffect(() => {
    generateStory()
    setStoryDraft(Array.isArray(sip?.story) ? sip.story : [])
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

function handleParagraphChange(idx, newValue) {
    setStoryDraft((prev) => {
      const next = [...prev]
      next[idx] = newValue
      return next
    })
  }

async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Clipboard copy failed:", err)
      const ta = document.createElement("textarea")
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
  }


if (!sip || isLoading) return <Loader text="בונים את הסיפורלה שלך..." />

  return (
    <section className='form-complete'>
       <div className='story-generate'>
        <h1>{sip.receiverName}</h1>
        <CardPreview
                idx={0}
                label={labels[0]}
                text={`הסיפור של ${sip.receiverName}`}
                onCopy={copyToClipboard}
                onChange={handleParagraphChange}
        />
        {Array.isArray(sip.story) &&          
            storyDraft.map((paragraph, idx) => (

            <CardPreview
                key={idx}
                idx={idx + 1}
                label={labels[idx + 1] || `Story ${idx + 1}`}
                text={paragraph}
                onCopy={copyToClipboard}
                onChange={handleParagraphChange}
            />
            ))
           }

           <CardPreview
                idx={12}
                label={labels[12]}
                text={sip.backCover}
                onCopy={copyToClipboard}
                onChange={handleParagraphChange}
        />
        </div>

        {isStoryReady 
            ? <ImagePrompts sipId={sip._id} copyToClipboard={copyToClipboard} labels={labels}/>
            : <Loader text="בונים את הסיפורלה שלך..." />
        }

    </section>
  )
}
