import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadSips, addSip, updateSip, removeSip, addSipMsg } from '../store/actions/sip.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { sipService } from '../services/sip/'
import { userService } from '../services/user'

import { SipList } from '../cmps/SipList'
import { SipFilter } from '../cmps/SipFilter'

export function SipIndex() {

    const [ filterBy, setFilterBy ] = useState(sipService.getDefaultFilter())
    const sips = useSelector(storeState => storeState.sipModule.sips)

    useEffect(() => {
        loadSips(filterBy)
    }, [filterBy])

    async function onRemoveSip(sipId) {
        try {
            await removeSip(sipId)
            showSuccessMsg('Sip removed')            
        } catch (err) {
            showErrorMsg('Cannot remove sip')
        }
    }

    async function onAddSip() {
        const sip = sipService.getEmptySip()
        sip.vendor = prompt('Vendor?', 'Some Vendor')
        try {
            const savedSip = await addSip(sip)
            showSuccessMsg(`Sip added (id: ${savedSip._id})`)
        } catch (err) {
            showErrorMsg('Cannot add sip')
        }        
    }

    async function onUpdateSip(sip) {
        const speed = +prompt('New speed?', sip.speed) || 0
        if(speed === 0 || speed === sip.speed) return

        const sipToSave = { ...sip, speed }
        try {
            const savedSip = await updateSip(sipToSave)
            showSuccessMsg(`Sip updated, new speed: ${savedSip.speed}`)
        } catch (err) {
            showErrorMsg('Cannot update sip')
        }        
    }

    return (
        <section className="sip-index">
            <header>
                <h2>Sips</h2>
                {userService.getLoggedinUser() && <button onClick={onAddSip}>Add a Sip</button>}
            </header>
            <SipFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <SipList 
                sips={sips}
                onRemoveSip={onRemoveSip} 
                onUpdateSip={onUpdateSip}/>
        </section>
    )
}