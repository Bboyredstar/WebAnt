import React, { useState,useEffect } from 'react'
import Axios from 'axios'
import './style.css'
import Preloader from '../Images/Preloader'

const Authentification = ()=> {

    const [userName,setUserName] = useState('')
    const [userPasswd,setUserPasswd] = useState('')
    const [authError,setAuthError] = useState(true)
    const [accessToken,setAccessToken] = useState('')
    const [refresh_token,setrefreshToken] = useState('')
    const [clientId,setClientId] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const [isLoading,setLoading] = useState(true)
    useEffect(()=>{
        getClientId()
    },[])

    
    
    const getClientId = async () => {
      try{
        const response= await Axios.post('api/clients',{
         "name": "string",
         "allowedGrantTypes": [
         "password", "refresh_token"
         ]
     }) 
        setClientId(response.data.id + '_' + response.data.randomId)
        setClientSecret(response.data.secret)
        setLoading(false)
        }
      catch(e){
        console.log(e)
        }
    }
      
      const gettingToken = async () =>{
        try{
          const data = await Axios({
                url: '/oauth/v2/token',
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                data: {
                  grant_type:'password',
                  username: 'testiruy',
                  password: 'password',
                  client_id: clientId,
                  client_secret: clientSecret,
                },
                maxContentLength: 2000,
            }
          )
        }
        //http://gallery.dev.webant.ru/oauth/v2/token?grant_type=password&client_id=840_54akov57sps0s0k0ogcockwskkw0o84ck0o08sw00gwcwco808&client_secret=2nb49hgzvoow40okkso0cc80osso00sc48swcgs88swwgkgccc&username=testiruy&password=password
      catch(err){
        console.log(err)
      }
    }




 return(
    <div className='authform'>
     {isLoading ? <Preloader/>: <form>
          <input type='text' className='authform__input' maxLength = '20' pattern='[A-Za-z]' placeholder='Username' />
          <input type='password' className='authform__input' minLength='6' maxLength='12' placeholder='Password' onChange={(e)=>console.log(e.target.value)}/>
          {authError && <button type='button' className = 'authform_submit' onClick = {gettingToken}>Log In</button>}
      </form>}
    </div>
 )
 }


export default Authentification