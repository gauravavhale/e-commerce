"use client"
import React, { useState } from 'react'
import styles from './login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'

const Login = () => {

  const router = useRouter()
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

  const fnSubmit= async(e)=>{
    e.preventDefault()

    try{
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          data : {
            email,
            password
          }
        })
      })
      const res = await result.json()
      if(res.name && res.email && res.id && res.token){
        toast.success('Logged in')
        router.push('/')
        const expiry = Date.now() + 60 * 60 * 1000;
        localStorage.setItem('USer',JSON.stringify({...res,expiry}));
      } else if(res.e === 'User Not Registered'){
        toast.error(res.e)
        router.push('/auth/signin')
      } else if(res.e === 'Wrong Password') {
        toast.error(res.e)
      }
    } catch(e){
      console.log(e);
      toast.error(e)
    }
     
  }


  return (
   <div className={`${styles.container}`}>
  <form className={styles.form} onSubmit={fnSubmit}>
    <h4 className="text-center mb-4">Login</h4>
    
    <div className="form-group mb-3">
      <label htmlFor="email">Email</label>
      <input
        required
        type="email"
        className="form-control mt-2 border-0 border-bottom rounded-0"
        onChange={fnEmail}
        placeholder="Enter Email"
        id="email"
      />
    </div>

    <div className="form-group mb-3">
      <label htmlFor="password">Password</label>
      <input
        required
        type="password"
        className="form-control mt-2 border-0 border-bottom rounded-0"
        onChange={fnPassword}
        placeholder="Enter Password"
        id="password"
      />
    </div>

    <button className={styles.submit} type="submit">
      Login
    </button>

    <div className="mt-4 text-center">
      <small>
        <Link href="/auth/signin" className="text-decoration-none">
          New to SwiftCart? Create an account
        </Link>
      </small>
    </div>
  </form>
</div>



  )
}

export default Login