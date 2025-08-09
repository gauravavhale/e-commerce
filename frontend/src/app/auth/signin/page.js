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
    if(res.ok && data && data.name && data.email && data.id && data.token){
      toast.success("Registered Successfully")
      router.push('/');
      const expiry = Date.now() + 60 * 60 * 1000; 
      localStorage.setItem('USer', JSON.stringify({...data, expiry }));
    } else if ( !res.ok && data.e === 'User Already Registered') {
      toast.error("User Already Registered")
    } else{
      toast.error("Unexpected error occurred")
    }
  } catch(e){
      toast.error(e)
    }
}

    return (
    <div className="container d-flex justify-content-center align-items-center h-100 px-3">
  <form
    className={`w-100 p-4 rounded shadow ${styles.form}`}
    style={{ maxWidth: '420px' }}
    onSubmit={fnSignin}
  >
    <h4 className="text-center mb-4 fw-bold">Register User</h4>

    {/* Username Field */}
    <div className="form-group mb-3">
      <label htmlFor="username" className="form-label">User Name</label>
      <input
        required
        type="text"
        id="username"
        autoComplete="username"
        className="form-control border-0 border-bottom rounded-0 shadow-none"
        placeholder="Enter Username"
        value={username}
        onChange={fnUsername}
      />
    </div>

    {/* Email Field */}
    <div className="form-group mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input
        required
        type="email"
        id="email"
        autoComplete="email"
        className="form-control border-0 border-bottom rounded-0 shadow-none"
        placeholder="Enter Email"
        value={email}
        onChange={fnEmail}
      />
    </div>

    {/* Password Field */}
    <div className="form-group mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input
        required
        type="password"
        id="password"
        autoComplete="new-password"
        className="form-control border-0 border-bottom rounded-0 shadow-none"
        placeholder="Enter Password"
        value={password}
        onChange={fnPassword}
      />
    </div>

    {/* Submit Button */}
    <button type="submit" className={`${styles.submitbtn}`}>
      Submit
    </button>

    {/* Redirect Link */}
    <div className="mt-4 text-center">
      <small>
        <Link href="/auth/login" className="text-decoration-none">
          Existing User? <strong>Login</strong>
        </Link>
      </small>
    </div>
  </form>
</div>
 
  )
}

export default Signin