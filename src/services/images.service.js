// services/images.service.js (frontend)
import { httpService } from "./http.service"

export const imagesService = {
  generatePrompts,
  savePrompts
}

async function generatePrompts(sipId) {
  // adjust URL to your API
  return httpService.post("images/generate", {sipId})
}

function savePrompts(sipId, prompts) {
  return httpService.put("images/prompts", { sipId, prompts })
}
