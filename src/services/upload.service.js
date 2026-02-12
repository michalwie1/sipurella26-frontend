import { httpService } from "./http.service.js"

export const uploadService = {
  uploadAudio,
  uploadImages,
}

// POST /api/upload/audio with field "file"
async function uploadAudio(blob) {
  const file = new File([blob], `audio-${Date.now()}.webm`, { type: blob.type })
  console.log('file', file)
  
  const formData = new FormData()
  formData.append("file", file)
  
  const res = await httpService.post("upload/audio", formData)
  console.log('res.url', res.url)
  // backend returns: { url }
  return res.url
}

// POST /api/upload/images with field "files" repeated
async function uploadImages(files) {
  const formData = new FormData()
  files.forEach((file) => formData.append("files", file))

  const res = await httpService.post("upload/images", formData)
  // backend returns: { urls: [] }
  return res.urls
}
