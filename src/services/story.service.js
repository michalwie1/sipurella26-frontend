import { httpService } from "./http.service.js"

export const storyService = { generate }

async function generate(sip) {
  // send only relevant fields (avoid sending imgs if not needed)
  const payload = {
    giverName: sip.giverName,
    receiverName: sip.receiverName,
    relation: sip.relation,
    event: sip.event,
    storyInput_q1: sip.storyInput_q1,
    storyInput_q2: sip.storyInput_q2,
    storyInput_q3: sip.storyInput_q3,
    storyInput_q4: sip.storyInput_q4,
  }

  const res = await httpService.post("story/generate", payload)
  return res.story
}
