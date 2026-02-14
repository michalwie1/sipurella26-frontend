// import { useState, useEffect } from 'react'


export function Loader({ text = '' }) {

    // const [showTxt, setShowTxt] = useState(false)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // setShowTxt(true)
    //     }, 5000)
    //     return () => clearTimeout(timer)
    // }, [])

    return (
        <div className="loader-container">
            {text && <h2>{text}</h2>}
           
             <div className="loader"></div>
        </div>
    )
}
