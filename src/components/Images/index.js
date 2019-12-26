import React, { useState,useEffect } from 'react'
import Preloader from './Preloader'
import BadConnection from './Error'
import Image from './Image'
import Axios from 'axios'
import { Pagination } from 'antd';
import 'antd/dist/antd.css'; 
import './style.css'

const Images = ({New = false, Popular = false})=>{
    const [isErrored,setError] = useState(false)
    const [isLoading,setLoading] = useState(true)
    const [images,setImages] = useState([])
    const [page,setPage] = useState(1)
    const [countOfItems,setCount] = useState(1)

    useEffect(() => {
        return () => {
            setPage(1)
            setLoading(false)
            setImages([])
        }
    },[New, Popular])
   
    useEffect(() => {   
       fetchData()
      },[New,Popular,page]); 
    
      const fetchData = async () =>{
        try{
            const {data} = await Axios.get('api/photos',{
                params:{
                    new:New,
                    popular:Popular,
                    page,
                    limit:15,
                    'order[id]':'desc'
                }
            }) 
            setCount( data.totalItems)
            setImages(data.data)
            setLoading(false)
        }
        catch(e){
            setLoading(false)
            setError(true)
        }
    }
        const takeImage = (element) => 
                (<Image key={element.id} description={element.description} 
                    imageId = {element.image.id} contentUrl={element.image.contentUrl} 
                    imageName = {element.name}
                    />)    
        
        const imageMap = () => {
            if (images.length){
                return images.map(image => takeImage(image))
            }
            return null
        }

        return (
            <div className='container'>
                {isLoading ?
                    <Preloader/>
                    : <>
                        {imageMap()}
                         <Pagination showTitle={false} className='pagination' current={page} hideOnSinglePage={true} pageSize={15} total={countOfItems} onChange={e => setPage(e)}/>
                    </>
                } 
                {isErrored && <BadConnection/>}
            </div>
        )
}

export default Images
