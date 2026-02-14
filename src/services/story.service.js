import { httpService } from "./http.service.js"

export const storyService = { generate }

async function generate(sip) {
  // send only relevant fields (avoid sending imgs if not needed)
  const payload = {
    _id: sip._id,
    giverName: sip.giverName,
    receiverName: sip.receiverName,
    relation: sip.relation,
    event: sip.event,
    story: sip.story,
    details: sip.details
  }

  const res = await httpService.post("story/generate", payload)
  return res.story
}
