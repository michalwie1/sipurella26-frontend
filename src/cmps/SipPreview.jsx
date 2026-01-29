import { Link } from 'react-router-dom'

export function SipPreview({ sip }) {
    return <article className="sip-preview">
        <header>
            <Link to={`/sip/${sip._id}`}>{sip.vendor}</Link>
        </header>

        <p>Speed: <span>{sip.speed.toLocaleString()} Km/h</span></p>
        {sip.owner && <p>Owner: <span>{sip.owner.fullname}</span></p>}
        
    </article>
}