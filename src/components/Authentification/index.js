import React, { useState, useEffect } from 'react'
import SignIn from './SignIn'
import Registration from './Registration'
import ImageUpload from '../ImageUpload'
import './style.css'

const Authentification = ({registration}) => {
    const clientId='840_54akov57sps0s0k0ogcockwskkw0o84ck0o08sw00gwcwco808'
    const clientSecret = '2nb49hgzvoow40okkso0cc80osso00sc48swcgs88swwgkgccc'
    const [isAuthorized,setAuthorization] = useState('')
    useEffect(()=>{
        setAuthorization(sessionStorage.getItem('Authorized'))
    },[isAuthorized])

    return(
        <>  
            {registration? <Registration clientId={clientId} clientSecret={clientSecret}/>:
            isAuthorized? <ImageUpload  clientId={clientId} clientSecret={clientSecret}/>
            :<SignIn clientId={clientId} clientSecret={clientSecret} setAuthorization={setAuthorization}/>}
        </>
    )
}

export default Authentification