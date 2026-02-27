import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'




export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<p>&copy; סיפורלה 2026</p>
			<a href="https://www.instagram.com/sipurella">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
			<a href="https://mail.google.com/mail/?view=cm&to=sipurella.books@gmail.com">
				<FontAwesomeIcon icon={faEnvelope} />
			</a>
		
		</footer>
	)
}