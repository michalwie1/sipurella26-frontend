import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


export function HomePage() {
    const navigate = useNavigate()
    const swiperRef = useRef(null)
    // const swiper = useSwiper()

    return (
        <section className="home">
            <h1>סיפורלה</h1>
            <h2>ספרים שמספרים סיפורים</h2>

             <div className="swiper-wrapper">
             <Swiper
                    dir="rtl"
                    modules={[Navigation, Pagination]}
                    navigation        
                    pagination={{ clickable: true }}
                    loop
                >

                    <SwiperSlide><img src='../../public/logo.jpg' /></SwiperSlide>
                    <SwiperSlide><img src='../../public/vite.svg' /></SwiperSlide>

                </Swiper>
    

                </div>

            <h2>דוגמאות</h2>
            <h2>מי אנחנו?</h2>

            <button onClick={() => navigate('/build')}>לבנות את הסיפורלה</button>
        </section >
    )
}

