import React, { useState, useEffect } from 'react'
import SignIn from './SignIn'
import Registration from './Registration'
import Axios from 'axios'
import './style.css'

const Authentification = ({isAuthorized,registration}) => {
    const [clientId,setClientId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [clientDataError,setClientDataError] = useState('')
    
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
          setClientDataError('Sorry some problem with server, try again later!')
        }
      }
      
    return(
        <>  
            {registration? <Registration clientId={clientId} clientSecret={clientSecret}/>:
            isAuthorized?'':<SignIn clientId={clientId} clientSecret={clientSecret} />
        }
        </>
    )
}

export default Authentification