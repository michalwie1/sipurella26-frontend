import { httpService } from '../http.service'

export const sipService = {
    query,
    getById,
    save,
    remove,
    addSipMsg
}

async function query() {
    return httpService.get(`sip`)
}

function getById(sipId) {
    return httpService.get(`sip/${sipId}`)
}

async function remove(sipId) {
    return httpService.delete(`sip/${sipId}`)
}
async function save(sip) {
    var savedSip
    if (sip._id) {
        savedSip = await httpService.put(`sip/${sip._id}`, sip)
    } else {
        savedSip = await httpService.post('sip', sip)
    }
    return savedSip
}

async function addSipMsg(sipId, txt) {
    const savedMsg = await httpService.post(`sip/${sipId}/msg`, {txt})
    return savedMsg
}