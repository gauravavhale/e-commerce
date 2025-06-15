"use client"
import React, { useState } from 'react'
import styles from './login.module.css'
import Link from 'next/link'

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const fnEmail=(e)=>{
      const email = e.target.value
      setEmail(email)
    }

    const fnPassword=(e)=>{
      const password = e.target.value
      setPassword(password)
    }

  const fnSubmit=(event)=>{
     
  }


  return (
    <div className={`${styles.container} d-flex justify-content-center`} >
    <form className={`${styles.form}`}>
      <div className={`form-group`}>
        <label for="number">Email</label>
        <input required className='form-control mt-2 mb-3 border-end-0 border-top-0 border-start-0' onChange={fnEmail}  placeholder="Enter Email" id="#email" type='email'/>
      </div>
      <div className='form-group'>
        <label for="password">Password</label>
        <input required className='form-control mt-2 border-end-0 border-top-0 border-start-0' onChange={fnPassword} placeholder="Enter Password" id="#password" type='password'/>
      </div>
      <button id="#login" className={`mt-3 w-100 ${styles.submit}`} onClick={fnSubmit} >Login</button>
      <div className='mt-5 d-flex justify-content-center align-items-center'>
        <small><Link className="text-decoration-none" href='/auth/signin'>New to SwiftCart ? Create an account</Link></small>
      </div>
    </form>
    </div>
  )
}

export default Login