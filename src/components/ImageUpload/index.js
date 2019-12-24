import React, { useState } from 'react'
import Axios from 'axios'
import './style.css'

const ImageUpload = ({clientId, clientSecret}) =>{
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [New,setNew] = useState(true)
    const [Popular,setPopular] = useState(false)
    const [category,setCategory] = useState('new')
    const [fileId,setId] = useState('')
    const [contentUrl,setContentUrl] = useState('')
    const [accessToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [refreshToken,setRefreshToken] = useState(localStorage.getItem('refreshToken'))
    const [loadingError,setError] = useState('')
 
    const getNewToken = async () =>{
            const data = await Axios({
                url:'oauth/v2/token',
                method:'get',
                params:{
                    'client_id':clientId,
                    'grant_type':'refresh_token',
                    'refresh_token':refreshToken,
                    'client_secret': clientSecret
                }
            })
            localStorage.setItem(accessToken,data.data.accessToken)
            localStorage.setItem(refreshToken,data.data.refreshToken)
            setAccessToken(data.data.access_token)
            setRefreshToken(data.data.refresh_token)
    }
    

    
    const uploadImage = async ()=>{
       
        if (validation()){
            try{
                const response = await Axios({
                    url:'api/photos',
                    method:'post',
                    data:{
                        name,
                        description,
                        'new':New,
                        'popular':Popular,
                        image:`/api/media_objects/${fileId}`
                        },
                    headers:{
                        Authorization:`Bearer ${accessToken} `,
                        Accept:'application/json',
                        }
                    })
            }
            catch(e){
                console.log(e)
            }
        }  
    }

  
    const validation = () =>{
        (category==='new')? setNew(true): setPopular(true)
        if (name&&description){
            if (fileId&&contentUrl) {
                setError('')
                return true
            }
            else {
                setError('You Must Choose Image For Uploadiing!')
                return false
            }
        }
        else {
            setError('Fields Image and Description can\'t be empty!')
            return false
        }
    }
    const upload = async(e)=>{
        let file = e.target.files[0]
        const formData= new FormData()
        formData.append('file',file)
        try{
            const data = await Axios.post( 'api/media_objects',formData,{
            headers:{
                Authorization:`Bearer ${accessToken} `,
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
            }              
            })
            setId(data.data.id)
            setContentUrl(data.data.contentUrl)
        }
        catch (e){
            setError('Image not loaded try again!')
        }
    }

    return (
       <div className='upload-container'>
            <form id='uploadForm' className='upload-container__form'>
                {loadingError&&<span className='upload-form__error'>{loadingError}</span>}
                <input className='form__image-name' type='text' placeholder='Image Name' minLength='3' maxLength='15' title='' onChange={(e)=>{setName(e.target.value)}}/>
                <span className='form__title'>Category:</span>
                <div className='form__category'>
                    <label className='category' htmlFor='new'>New</label>
                    <input className='category-type' type='radio' name='category'id='new' value='new'
                    checked={'new'===category} onChange={e=>setCategory(e.target.value)}
                    />
                    <label className='category' htmlFor='popular' >Popular</label>
                    <input className='category-type' type='radio' name='category' id='popular' value='popular'
                      checked={'popular'===category} onChange={e=>setCategory(e.target.value)}
                        
                    />
                </div>
                <textarea className='form__image-description'rows="8" cols="45" placeholder='Image Description' 
                onChange={e=>setDescription(e.target.value)}></textarea>
                <label  htmlFor='upload-file' className='form__image-load'>
                    <span>Choose File</span>
                    <i className="material-icons">attach_file</i>
                    <input className='upload-input' type="file" accept="image/*" id = 'upload-file' onChange={(e)=>upload(e)}/>
                </label>
                <button type='button' className='upload-button' onClick={uploadImage} > Upload </button>
            </form>
          
        </div> 
    )
}
export default ImageUpload
