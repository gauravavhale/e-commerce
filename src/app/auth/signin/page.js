"use client"
import React, { useState } from 'react'
import styles from './signin.module.css'
import Link from 'next/link'

const signin = () => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const fnUsername=(e)=>{
    setUsername(e.target.value)
  }
  const fnEmail=(e)=>{
    setEmail(e.target.value)
  }
  const fnPassword=(e)=>{
    setPassword(e.target.value)
  }

  const fnSignin=(e)=>{
    e.preventDefault()
    const userData = {
      username: username,
      email:email,
      password:password
    }

    // fetch("https://fakestoreapi.com/users",{
    //   method:"POST",
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify(userData)
    //   .then((response)=> response.json())
    //   .then((data)=>console.log(data))
    //   .catch(error => console.error('Error:', error)),
    // })
  }

    return (
    <div className={`${styles.container} d-flex justify-content-center`} >
    <form className={`${styles.form}`} onSubmit={fnSignin}>
      <div className={`form-group`}>
        <label htmlFor="username">User Name</label>
        <input required className='form-control mt-1 mb-3 border-end-0 border-top-0 border-start-0' onChange={fnUsername} value={username}  placeholder="Enter Username" id="username" type='text'/>
      </div>
      <div className={`form-group`}>
        <label htmlFor="email">Email</label>
        <input required className='form-control mt-1 mb-3 border-end-0 border-top-0 border-start-0' onChange={fnEmail} value={email}  placeholder="Enter Email" id="email" type='email'/>
      </div>
      <div className='form-group'>
        <label htmlFor="password">Password</label>
        <input required value={password} className='form-control mt-1 border-end-0 border-top-0 border-start-0' onChange={fnPassword} placeholder="Enter Password" id="password" type='password'/>
      </div>
      <button className={` mt-3 w-100 ${styles.submit}`} type='submit' >Submit</button>
      <div className='mt-5 '>
        <button className='btn border-transparent'><Link className="text-decoration-none" href='/auth/login'>Existing User ? Login</Link></button>
      </div>
    </form>
    </div> 
  )
}

export default signin