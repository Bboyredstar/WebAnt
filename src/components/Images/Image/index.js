import React, { useState } from 'react'
import './style.css'
import { Modal } from 'antd';

const Image = (props) =>{

    const [modalVisibility,setModalVisible] = useState(false)
    const [imageInfo,setImageInfo] = useState('')
    const modalStyle = {
        padding:24,
        height:684,
    }

    const modalOpen = image=>{
            setImageInfo(image)
            setModalVisible(true)
    }
return(
    <div className='item'>
        <img className='item-image' src={'http://gallery.dev.webant.ru/media/'+props.contentUrl} alt={props.imageName} 
        onClick={(e) => modalOpen(e.target)}/>
        <Modal bodyStyle={modalStyle} centered={true} visible={modalVisibility} 
            onCancel={() => setModalVisible(false)} closable={false} 
            footer={null} width={728}> 
            <img className='modal-image' src={imageInfo.src} alt={imageInfo.alt}/>
            <div className ='modal-image__info'>
                <h1 className='modal-image__name'>{props.imageName}</h1>
                <p className='modal-image__description'>{props.description}</p>
            </div>
        </Modal> 
    </div>);
}

export default Image


