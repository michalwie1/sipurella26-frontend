import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { imagesService } from "../services/images.service"
import { loadSip, updateSip } from '../store/actions/sip.actions.js';
import { Loader } from "../cmps/Loader"
import { CardPreview } from "../cmps/CardPreview"

export function ImagePrompts({ sipId, copyToClipboard, labels, isMidjourney }) {
  const sip = useSelector(state => state.sipModule.sip)
  const [prompts, setPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  // const [recraftLink, setRecraftLink] = useState(null)

  useEffect(() => {
    if (!sipId) return
    loadSip(sipId)
    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true)
        setErrMsg("")

        const res = await imagesService.generatePrompts(sipId, isMidjourney)

        if (!Array.isArray(res?.prompts)) {
          throw new Error("Invalid response (expected { prompts: [] })")
        }

        if (!cancelled) setPrompts(res.prompts)
      } catch (err) {
        console.error(err)
        if (!cancelled) setErrMsg("Failed to load/generate prompts.")
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [sipId])


  function handlePromptChange(idx, newValue) {
    setPrompts(prev => {
      const next = [...prev]
      next[idx] = newValue
      return next
    })
  }

  async function onSavePrompts() {
  try {
    setIsLoading(true)
    setErrMsg("")
    // you need an endpoint that updates sip.prompts
    isMidjourney ? updateSip({...sip, promptsMj: prompts}) : updateSip({...sip, promptsRc: prompts}) 
  } catch (err) {
    console.error(err)
    setErrMsg("Failed to save prompts.")
  } finally {
    setIsLoading(false)
  }
}

async function onGenerateRecraft(promptIdx){
  console.log('generating....')
  try{
    const res = await imagesService.generateImages(sipId, promptIdx)
    // setRecraftLink(res)
    console.log(res)

  } catch (err) {
    console.log('error', err)
  }
}

  if (!sipId) return <div>Missing sipId</div>
  if (isLoading) return <Loader text="Generating prompts..." />

  if (errMsg) {
    return (
      <section className="image-prompts">
        <header>
        <h1>{`${isMidjourney ? 'Midjourney' : 'Recraft'} Prompts `}</h1>
        </header>
        <p style={{ color: "crimson" }}>{errMsg}</p>
        <button onClick={() => imagesService.generatePrompts(sipId).then(r => setPrompts(r.prompts)).catch(console.error)}>
          Try again
        </button>
      </section>
    )
  }


  return (
   <section className="image-prompts">
         <header>
          <h1>{isMidjourney ? 'Midjourney' : 'Recraft'}</h1>
          {/* Save prompts */}
          <button type="button" onClick={onSavePrompts} disabled={!prompts.length}>
            Save prompts
          </button>
          <a href={isMidjourney ? "https://discord.com/channels/1335254665784201227/1476258095226163280" : "https://www.recraft.ai/project/a4784568-db0e-4033-956c-9b8996414149"}>Link</a>

        </header>

      
          {prompts.length && prompts.map((prompt, idx) => (
            <CardPreview
              key={idx}
              idx={idx}
              label={labels[idx] || `Prompt ${idx + 1}`}
              text={prompt}
              onCopy={copyToClipboard}
              onChange={handlePromptChange}
              isRecraft={!isMidjourney}
              onGenerateRecraft= {onGenerateRecraft}
              // recraftLink = {recraftLink}
            />
          ))}
     
      
    </section>
  )
}

