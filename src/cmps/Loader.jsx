// import { useState, useEffect } from 'react'


export function Loader() {

    // const [showTxt, setShowTxt] = useState(false)

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         // setShowTxt(true)
    //     }, 5000)
    //     return () => clearTimeout(timer)
    // }, [])

    return (
        <div className="loader-container">
           
             <div className="loader"></div>
        </div>
    )
}
