import { useState } from "react"


export function CardPreview({ idx, label, text, onCopy, onChange }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await onCopy(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }

  function handleChange(ev) {
    onChange(idx, ev.target.value)
  }

  return (
    <article className="card-preview">

      <div className="card-wrapper">
        <div className="label">
          <strong>{label}</strong>
          <span>#{idx + 1}</span>
        </div>

        <button type="button" onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        rows={6} 
      />
    </article>
  )
}