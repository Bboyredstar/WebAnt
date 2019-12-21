import React, { useState, useEffect }  from 'react'
import SignIn from '../SignIn'
import Axios from 'axios'
import '../style.css'


const Registration = ({clientId, clientSecret}) => {
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isRegistrationDone, setRegistrtionDone] = useState(false)
    const [registrationErrrorDescription,setErrorDescription] = useState('')

    useEffect(()=>{
        setRegistrtionDone(false)
    },[])
   
    const createUser = async () => {
        try{
           const data =  await Axios({
                url:'api/users',
                method:'post',
                header:{
                    'Accept':'application/json'
                },
                data:{
                    email,
                    phone,
                    fullName,
                    password,
                    username,
                    roles: [
                      ''
                    ]
                }
            })
            setErrorDescription('')
            setRegistrtionDone(true)
            sessionStorage.setItem('Authorized', true);
            
        }
        catch(error){
            setErrorDescription(error.response.data.detail)
        }
    }

    const validation = ()=>{
        if (email && phone && fullName && username && password){
            createUser()
        }
        else{
            setErrorDescription('Field can\'t be empty')
        }

    }
    return(
        <div >
            {!isRegistrationDone?
           <form className='authform'> 
                {registrationErrrorDescription && <div className='auth__error'>{registrationErrrorDescription}</div>}
                <input type='text' 
                className='authform__input' 
                placeholder='Full Name' 
                onChange={(e)=>setFullName(e.target.value)} 
                title='The name must contain at least five letters. Numbers and special characters are not allowed.' 
                />
                <input 
                type='tel' 
                className='authform__input' 
                placeholder='Phone Number' 
                title='The name must contain at least eleven numbers.Letters and special characters are not allowed.' 
                onChange={(e)=>setPhone(e.target.value)}
                />
                <input 
                type='email' 
                className='authform__input'  
                placeholder='Email' 
                title='The email must contain @.'
                onChange={(e)=>setEmail(e.target.value)} 
                /> 
                <input 
                type='text' 
                className='authform__input' 
                placeholder='Username' 
                onChange={(e)=>setUserName(e.target.value)} 
                title='' 
                />
                <input 
                type='password' 
                className='authform__input' 
                placeholder='Password' 
                title=''
                onChange={(e)=>setPassword(e.target.value)} 
                />
                <button type='button' className='authform__submit' onClick = {validation}>Log In</button>
            </form>:
            <>
                <h1 className='auth-info'>Your account was successfully created. now please log in!</h1>
                <SignIn clientId={clientId} clientSecret={clientSecret} isRegistrationDone/>
            </> }   
        </div>
    )
}
export default Registration