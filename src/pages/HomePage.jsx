import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const navigate = useNavigate()

    return (
        <section className="home">
            <h1>סיפורלה</h1>
            <h2>ספרים שמספרים סיפורים</h2>

            <button onClick={() => navigate('/build')}>לבנות את הסיפורלה</button>
        </section >
    )
}

