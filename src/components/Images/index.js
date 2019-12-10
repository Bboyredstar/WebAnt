import React, { useState,useEffect } from 'react'
import Preloader from './Preloader'
import BadConnection from './Error'
import Image from './Image'
import './style.css'
import Axios from 'axios'
import { Pagination } from 'antd';

  
const Images = ({New = false, Popular = false})=>{
    const [error,setError] = useState(false)
    const [isLoading,setLoading] = useState(true)
    const [images,setImages] = useState()
    const [page,setPage] = useState(1)
    const [countOfItems,setCount] = useState(1)
   
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
                    limit:15
                }
            }) 
            console.log({data})
            setCount( data.totalItems)
            setImages(data.data)
            setLoading(false)
        }
        catch(e){
            console.log({e})
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
        const changePage = (e) =>{
            console.log(e.target.value)
        }
        

        return (
            <div className='container'>
                {isLoading ? <Preloader/>:imageMap()} 
                {error && <BadConnection/>}
                {!isLoading &&<Pagination className='pagination' defaultCurrent={1} pageSize={15}  total={countOfItems} onChange={e => setPage(e)}/>} 
            </div>
    )
}

export default Images
