
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'sip'

export const sipService = {
    query,
    getById,
    save,
    remove,
    addSipMsg
}
window.cs = sipService


async function query(filterBy = { txt: '', minSpeed: 0 }) {
    var sips = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        sips = sips.filter(sip => regex.test(sip.vendor) || regex.test(sip.description))
    }
    if (minSpeed) {
        sips = sips.filter(sip => sip.speed >= minSpeed)
    }
    if(sortField === 'vendor'){
        sips.sort((sip1, sip2) => 
            sip1[sortField].localeCompare(sip2[sortField]) * +sortDir)
    }
    if(sortField === 'speed'){
        sips.sort((sip1, sip2) => 
            (sip1[sortField] - sip2[sortField]) * +sortDir)
    }
    
    sips = sips.map(({ _id, vendor, speed, owner }) => ({ _id, vendor, speed, owner }))
    return sips
}

function getById(sipId) {
    return storageService.get(STORAGE_KEY, sipId)
}

async function remove(sipId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, sipId)
}

async function save(sip) {
    var savedSip
    if (sip._id) {
        const sipToSave = {
            _id: sip._id,
            speed: sip.speed
        }
        savedSip = await storageService.put(STORAGE_KEY, sipToSave)
    } else {
        const sipToSave = {
            vendor: sip.vendor,
            speed: sip.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedSip = await storageService.post(STORAGE_KEY, sipToSave)
    }
    return savedSip
}

async function addSipMsg(sipId, txt) {
    // Later, this is all done by the backend
    const sip = await getById(sipId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    sip.msgs.push(msg)
    await storageService.put(STORAGE_KEY, sip)

    return msg
}