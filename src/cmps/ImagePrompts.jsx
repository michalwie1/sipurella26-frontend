import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { imagesService } from "../services/images.service"
import { Loader } from "../cmps/Loader"
import { CardPreview } from "../cmps/CardPreview"

export function ImagePrompts({ sipId, copyToClipboard, labels }) {
  const [prompts, setPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

 

  useEffect(() => {
    if (!sipId) return
    let cancelled = false

    ;(async () => {
      try {
        setIsLoading(true)
        setErrMsg("")

        const res = await imagesService.generatePrompts(sipId)

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



  async function onCopyAll() {
    await copyToClipboard(prompts.join("\n\n---\n\n"))
  }

  async function onRegenerate() {
    try {
      setIsLoading(true)
      setErrMsg("")

      // only works if backend supports force (optional)
      const res = await imagesService.generatePrompts(sipId, { force: true })

      if (!Array.isArray(res?.prompts)) {
        throw new Error("Invalid response (expected { prompts: [] })")
      }

      setPrompts(res.prompts)
    } catch (err) {
      console.error(err)
      setErrMsg("Failed to regenerate prompts.")
    } finally {
      setIsLoading(false)
    }
  }

  function handlePromptChange(idx, newValue) {
    setPrompts(prev => {
      const next = [...prev]
      next[idx] = newValue
      return next
    })
  }

  if (!sipId) return <div>Missing sipId</div>
  if (isLoading) return <Loader text="Generating prompts..." />

  if (errMsg) {
    return (
      <section className="image-prompts">
        <h2>Midjourney Prompts</h2>
        <p style={{ color: "crimson" }}>{errMsg}</p>
        <button onClick={() => imagesService.generatePrompts(sipId).then(r => setPrompts(r.prompts)).catch(console.error)}>
          Try again
        </button>
      </section>
    )
  }


  return (
   <section className="image-prompts">
        <h1>Midjourney Prompts</h1>

        {/* <button type="button" onClick={onRegenerate} disabled={!sipId}>
          Regenerate
        </button>

        <button type="button" onClick={onCopyAll} disabled={!prompts.length}>
          Copy all
        </button> */}
      
          {prompts.length && prompts.map((prompt, idx) => (
            <CardPreview
              key={idx}
              idx={idx}
              label={labels[idx] || `Prompt ${idx + 1}`}
              text={prompt}
              onCopy={copyToClipboard}
              onChange={handlePromptChange}
            />
          ))}
     
      
    </section>
  )
}

