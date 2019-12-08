import React from 'react'
import Preloader from './Preloader'
import BadConnection from './Error'
import Image from './Image'
import './style.css'
//http://gallery.dev.webant.ru/media/


const Images = ()=>{
    return (
        <div className="container">
            <Preloader/>
            {/* <BadConnection/> */}
        </div>
    )
}

export default Images