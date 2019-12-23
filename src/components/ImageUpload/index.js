import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './style.css'

const ImageUpload = ({clientId, clientSecret}) =>{
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [New,setNew] = useState(true)
    const [Popular,setPopular] = useState(false)
    const [fileId,setId] = useState('')
    const [contentUrl,setContentUrl] = useState('')
    const [accessToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [refreshToken,setRefreshToken] = useState(localStorage.getItem('refreshToken'))
    const [loadingError,setError] = useState('')
 
    const getNewToken = async () =>{
            try{
            const data = await Axios({
                url:'oauth/v2/token',
                method:'post',
                params:{
                    'client_id':clientId,
                    'grant_type':'refresh_token',
                    'refresh_token':refreshToken,
                    'client_secret': clientSecret
                }
            })
        setAccessToken(data.accessToken)
        }   
        catch{
            
        }
    }

    const uploadImage = async ()=>{
            await Axios({
                url:'api/photos',
                method:'post',
                data:{
                    name,
                    description,
                    New,
                    Popular,
                    'image':{
                        fileId,
                        contentUrl,
                    }
                },
                headers:{
                    Authorization:`Bearer ${accessToken} `,
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    }
                })
    }  

  

    const upload = async(e)=>{
        
        let file = e.target.files[0]
        const formData= new FormData()
        formData.append('file',file)
        console.log(formData)
        try{
            const data = await Axios.post( 'api/media_objects',formData,{
            headers:{
                Authorization:`Bearer ${accessToken} `,
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
            }              
            })
            setId(data.id)
            setContentUrl(data.contentUrl)
        }
        catch (e){
            setError('Image not loaded try again!')
        }
    }

    return (
       <div className='upload-container'>
            <form id='uploadForm' className='upload-container__form'>
                <input className='form__image-name' type='text' placeholder='Image Name' minLength='3' maxLength='15' title=''/>
                <span className='form__title'>Category:</span>
                <div className='form__category'>
                    <label className='category' for='new'>New</label>
                    <input className='category-type' type='radio' name='category'id='new' defaultChecked />
                    <label className='category' for='popular'>Popular</label>
                    <input className='category-type' type='radio' name='category' id='popular'/>
                </div>
                <textarea className='form__image-description'rows="8" cols="45" placeholder='Image Description'></textarea>
                <label for='upload-file' className='form__image-load'>
                    <span>Choose File</span>
                    <i class="material-icons">attach_file</i>
                    <input className='upload-input' type="file" accept="image/*" id = 'upload-file' onChange={(e)=>upload(e)}/>
                </label>
                <button type='button' className='upload-button'> Upload </button>
            </form>
          
        </div> 
    )
}
export default ImageUpload
