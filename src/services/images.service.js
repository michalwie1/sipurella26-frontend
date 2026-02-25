// services/images.service.js (frontend)
import { httpService } from "./http.service"

export const imagesService = {
  generatePrompts,
  // savePrompts,
  generateImages
}

async function generatePrompts(sipId, isMidjourney) {
  // adjust URL to your API
  return httpService.post("images/generate", {sipId, isMidjourney})
}

// function savePrompts(sipId, prompts, isMidjourney) {
//   return httpService.put("images/prompts", { sipId, prompts, isMidjourney })
// }

async function generateImages(sipId, promptIdx) {
  return httpService.post("images/recraft", { sipId, promptIdx })
}
