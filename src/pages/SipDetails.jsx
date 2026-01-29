import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadSip, addSipMsg } from '../store/actions/sip.actions'


export function SipDetails() {

  const {sipId} = useParams()
  const sip = useSelector(storeState => storeState.sipModule.sip)

  useEffect(() => {
    loadSip(sipId)
  }, [sipId])

  async function onAddSipMsg(sipId) {
    try {
        await addSipMsg(sipId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Sip msg added`)
    } catch (err) {
        showErrorMsg('Cannot add sip msg')
    }        

}

  return (
    <section className="sip-details">
      <Link to="/sip">Back to list</Link>
      <h1>Sip Details</h1>
      {sip && <div>
        <h3>{sip.vendor}</h3>
        <h4>{sip.speed} KMH</h4>
        <pre> {JSON.stringify(sip, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddSipMsg(sip._id) }}>Add sip msg</button>

    </section>
  )
}