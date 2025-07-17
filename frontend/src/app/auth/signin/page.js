"use client"
import React, { useState } from 'react'
import styles from './signin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Signin = () => {

  const router = useRouter()

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

  const fnSignin = async(e)=>{
    e.preventDefault()

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register-user`,{
      method:"POST",
      headers : {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data : {
            username,
            email,
            password
      }
     })
    })
    const data = await res.json()
    // console.log(id,name,email,token)
    if(data && data.id && data.name && data.email && data.token){
      toast.success('Signed in');
      router.push('/');
      const expiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry
      localStorage.setItem('USer', JSON.stringify({...data, expiry }));
    } else if (data && data.error) {
      toast.error(data.error);
    } else {
      toast.error('Registration failed');
    }
    } 
    catch(e){
      alert(e);
    }
  }

    return (
    <div className={`${styles.container} d-flex justify-content-center`} >
    <form className={`${styles.form}`} onSubmit={fnSignin}>
      <h4 className='text-center mb-4'>Register User</h4>
      <div className={`form-group`}>
        <label htmlFor="username">User Name</label>
        <input required className='form-control mt-2 mb-3 border-end-0 border-top-0 border-start-0' onChange={fnUsername} value={username}  placeholder="Enter Username" id="username" type='text' autoComplete='username'/>
      </div>
      <div className={`form-group`}>
        <label htmlFor="email">Email</label>
        <input required className='form-control mt-2 mb-3 border-end-0 border-top-0 border-start-0' onChange={fnEmail} value={email}  placeholder="Enter Email" id="email" type='email' autoComplete='email'/>
      </div>
      <div className='form-group'>
        <label htmlFor="password">Password</label>
        <input required value={password} className='form-control mt-2 border-end-0 border-top-0 border-start-0' onChange={fnPassword} placeholder="Enter Password" id="password" type='password' autoComplete='current-password' />
      </div>
      <button className={` mt-3 w-100 ${styles.submit}`} type='submit' >Submit</button>
      <div className='mt-5 d-flex justify-content-center'>
        <small><Link className="text-decoration-none" href='/auth/login'>Existing User ? Login</Link></small>
      </div>
    </form>
    </div> 
  )
}

export default Signin