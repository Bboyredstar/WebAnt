import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import './style.css'
import Preloader from '../Images/Preloader'

const SignIn = ()=> {

    const [userName,setUserName] = useState('')
    const [userPasswd,setUserPasswd] = useState('')
    const [isUserInputDataWrong,setInputError] = useState('')
    const [errorTokenDescription,setDescription] = useState('')
    const [isAuthErrored,setAuthError] = useState(true)
    const [accessToken,setAccessToken] = useState('')
    const [refreshToken,setrefreshToken] = useState('')
    const [clientId,setClientId] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const [isLoading,setLoading] = useState(false)
    
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
        console.log(error.response.data.error_description)
      }
    }
      const gettingToken = async () =>{
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
          setrefreshToken(data.refresh_token)
          setAccessToken(data.access_token)
          
        }
        catch(error) {
            setDescription(error.response.data.error_description);
          }
    }
     const validation = (data)=>{
        const regex = /[A-Za-z0-9]{6,}/
        return !regex.test(data)
          ? "The input data must contain at least six letters or numbers."
          : "";
      }
      const dataValidation = (value)=>{
        const error = validation(value)
        setInputError(error)
        if(!error){
          setAuthError(false)
        }       
      }
    
 
return(
    <div className='authform'>
      <form>
          {isUserInputDataWrong && <div>{isUserInputDataWrong}</div>}
          <input type='text' className='authform__input' maxLength = '20' pattern='[A-Za-z]' placeholder='Username' onBlur={(e)=>dataValidation(e.target.value)}/>
          <input type='password' className='authform__input' minLength='6' maxLength='12' placeholder='Password' onBlur={(e)=>dataValidation(e.target.value)}/>
          {!isAuthErrored && <button type='button' className = 'authform_submit' onClick = {gettingToken}>Log In</button>}
      </form>
    </div>)
  
}

  export default SignIn