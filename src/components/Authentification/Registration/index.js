import React, { useState }  from 'react'
import Axios from 'axios'


const Registration = () => {
    const [userFullName,setFullName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userPhone,setUserPhone] = useState('')
    const [userName,setUserName] = useState('')
    const [userPasswd,setUserPasswd] = useState('')
    const [registrationErrrorDescription,setErrorDescription] = useState('')
    const [isRegistrationDone,setRegistrationFlag] = useState(false)
    const createUser = async () => {
        try{
            Axios({
                url:'api/users',
                method:'post',
                header:{
                    'Accept':'application/json'
                },
                data:{
                    'email': userEmail,
                    'phone': userPhone,
                    'fullName': userFullName,
                    'password': userName,
                    'username': userPasswd,
                    'roles': [
                      ''
                    ]
                }
            })
            setErrorDescription('')
            setRegistrationFlag(true)
        }
        catch(e){
            setErrorDescription(e.datail)
        }
    }

    const validation = ()=>{
        if (userEmail && userPhone && userFullName && userName && userName){
            createUser()
        }
        else {
            return false
        }

    }
    return(
        <div >
           { !isRegistrationDone? <form className='authform'> 
                {registrationErrrorDescription && <div className='auth__error'>{registrationErrrorDescription}</div>}
                <input type='text' className='authform__input' minLength='8' maxLength='30' pattern='[A-Za-z]{3,}\s[A-Za-z]{5,}' placeholder='Full Name' onChange={(e)=>setFullName(e.target.value)} 
                title='The name must contain at least five letters. Numbers and special characters are not allowed.' required/>
                <input type='tel' className='authform__input' placeholder='Phone Number' minLength='11' maxLength='12' pattern='[0-9]{11,}'
                 title='The name must contain at least eleven numbers.Letters and special characters are not allowed.' onChange={(e)=>setUserPhone(e.target.value)}  required/>
                <input type='email' className='authform__input'  placeholder='Email' onChange={(e)=>setUserEmail(e.target.value)} required/> 
                <input type='text' className='authform__input' placeholder='Username' minLength='5' maxLength='20' pattern='[A-Za-z0-9]{5,}'
                onChange={(e)=>setUserName(e.target.value)} required/>
                <input type='password' className='authform__input' minLength='6' maxLength='12' placeholder='Password' onChange={(e)=>setUserPasswd(e.target.value)} required/>
                <button type='submit' className = 'authform__submit' onClick = {validation}>Log In</button>
            </form>: <h1>It's okey!</h1> }
        </div>
    )
}
export default Registration