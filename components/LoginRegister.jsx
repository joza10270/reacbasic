import React from 'react'
import { Login } from './LoginPage'
import { Register } from './Register'




import { useState } from 'react'




export const LoginRegister = () => {
    let [isLogin,setIsLogin] = useState(true);
    return (


   <>
  
       { isLogin ? <Login setLogin={setIsLogin}/> : <Register setLogin={setIsLogin}/> }           
   </>
  
 )
}
