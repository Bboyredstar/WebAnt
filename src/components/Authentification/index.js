import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {NavLink} from 'react-router-dom'
import './style.css'
const SignIn = ()=> {

    const [userName,setUserName] = useState('')
    const [userPasswd,setUserPasswd] = useState('')
    const [errorTokenDescription,setDescription] = useState('')
    const [clientId,setClientId] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    
    useEffect(()=>{
      getClientId() 
    },[])

    const getClientId = async () => {
      try {
        const response = await Axios.post('api/clients',{
          "name": "string",
          "allowedGrantTypes": [
          "password", "refresh_token"]
        }) 
        setClientId(response.data.id + '_' + response.data.randomId)
        setClientSecret(response.data.secret)
      }
      catch(error){
        setDescription('Sorry some problem with server, try again later!')
      }
    }
    const getToken = async () =>{
        try{
          const data = await Axios.get('oauth/v2/token',{
            params:{
              'grant_type':'password',
              'client_id':clientId,
              'client_secret':clientSecret,
              'username':userName,
              'password':userPasswd
            }
          })
          setTokens(data.data.access_token,data.data.refresh_token)
          setDescription('')
        }
        catch(error) {
            setDescription(error.response.data.error_description)
          }
    }   
    const setTokens = (accessToken,refreshToken) =>{
        if ((!!accessToken) && (!!refreshToken)){
          localStorage.setItem('accessToken',accessToken)
          localStorage.setItem('refreshToken',refreshToken)
        }
    }
    
return(
    <div className='authform'>
      <form >
          {errorTokenDescription && <div className='auth__error'>{errorTokenDescription}</div>}
          <input type='text' className='authform__input' maxLength = '20' placeholder='Username' onChange={(e)=>setUserName(e.target.value)} title='Input Username' required/>
          <input type='password' className='authform__input' minLength='6' maxLength='12' placeholder='Password' onChange={(e)=>setUserPasswd(e.target.value)} title='Input Password' required/>
          <NavLink to = '/registration'>
              <span className='registration__link'>Create New Account</span>
          </NavLink>
          <button type='button' className = 'authform__submit' onClick = {getToken}>Log In</button>
      </form>
    </div>)
} 

  export default SignIn