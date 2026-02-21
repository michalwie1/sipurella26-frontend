import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { imagesService } from "../services/images.service"
import { Loader } from "../cmps/Loader"

export function ImagePrompts({ sipId }) {
  const [prompts, setPrompts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const labels = useMemo(() => {
    const arr = []
    arr.push("Cover")
    for (let i = 1; i <= 10; i++) arr.push(`Paragraph ${i}`)
    arr.push("Wish")
    arr.push("Back cover")
    return arr
  }, [])

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
      <header style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h2 style={{ margin: 0 }}>Midjourney Prompts</h2>

        <button type="button" onClick={onRegenerate} disabled={!sipId}>
          Regenerate
        </button>

        <button type="button" onClick={onCopyAll} disabled={!prompts.length}>
          Copy all
        </button>
      </header>

      {!prompts.length ? (
        <p>No prompts yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
          {prompts.map((prompt, idx) => (
            <PromptCard
              key={idx}
              idx={idx}
              label={labels[idx] || `Prompt ${idx + 1}`}
              prompt={prompt}
              onCopy={copyToClipboard}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function PromptCard({ idx, label, prompt, onCopy }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await onCopy(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }

  return (
    <article
      className="prompt-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "12px",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
          <strong>{label}</strong>
          <span style={{ opacity: 0.6 }}>#{idx + 1}</span>
        </div>

        <button type="button" onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <textarea
        value={prompt}
        readOnly
        rows={6}
        style={{
          width: "100%",
          resize: "vertical",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontFamily: "monospace",
          fontSize: "13px",
          lineHeight: 1.35,
        }}
      />
    </article>
  )
}
