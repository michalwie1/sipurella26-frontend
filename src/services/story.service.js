import { httpService } from "./http.service.js"

export const storyService = { generate }

async function generate(sipId) {
  const updatedSip = await httpService.post("story/generate", { sipId })
  return updatedSip
}
