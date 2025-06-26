"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styles from './cart.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Cart = () => {
  const router = useRouter()

  // Access the cart data from the Redux store
  const cartProducts = useSelector((state) => state.appReducer?.CartData || [])
  const dispatch = useDispatch()

  const handleRemove=(id)=>{
    const updatedCart = cartProducts.filter((product)=>product.id !== id)
    dispatch({type:"Cart",payload:updatedCart})
  }

  const fnPlaceOrder=()=>{
    const user = JSON.parse(localStorage.getItem('USer'))
    if(user && user.token){
      dispatch({type:"Cart",payload:[] });
      alert('Order Placed Successfully')
      router.push('/')
    } else {
      alert('Login to make a Order')
      router.push('/auth/login')
    }
  }

  // Helper to render stars
  const renderStars = (rating) => {
    const ratingValue = typeof rating === 'object' && rating.rate ? rating.rate : rating;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(ratingValue)) {
        stars.push(
          <i key={i} className="bi bi-star-fill text-success" style={{ marginRight: '2px' }} />
        );
      } else if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
        stars.push(
          <i key={i} className="bi bi-star-half text-success" style={{ marginRight: '2px' }} />
        );
      } else {
        stars.push(
          <i key={i} className="bi bi-star-fill text-warning" style={{ marginRight: '2px' }} />
        );
      }
    }
    return stars;
  };

  return (
    cartProducts.length === 0 ? (
      <div className="d-flex justify-content-center align-items-center vh-100 pb-5">
        <h6>Your cart is empty</h6>
      </div>
    ) : (
      <div>
        <div style={{maxHeight: '70vh', overflowY: 'auto'}} className='p-3'>
          { cartProducts.map((product,index)=>{
            return (
              <div className='card mb-3 shadow-sm' key={index}>
                <div className='row g-0 align-items-center flex-row'>
                  <div className='col-4 p-2 d-flex justify-content-center'>
                    <Image src={product.image} width={100} height={100} className='img-fluid' style={{objectFit:"cover"}} alt={product.title} />
                  </div>
                  <div className='col-8 d-flex flex-column align-items-start p-2'>
                    <h6 className='mb-1'>{product.title}</h6>
                    <div className='mb-1 text-success'>
                      {renderStars(product.rating)}
                      {product.rating && product.rating.rate && (
                        <span className="ms-2">({product.rating.rate}/5)</span>
                      )}
                    </div>
                    <div className='mb-2'>
                      <strong className='text-success me-2'>$ {product.price}</strong>
                    </div>
                    <button className={`${styles.rmvButton}`} onClick={()=>handleRemove(product.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          }) }
        </div>
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top" style={{height:'60px', background:'#2874f0', position: 'sticky', bottom: 0, zIndex: 10}}>
          <span className='text-white fw-bold'>Total : {cartProducts.reduce((total, product) => total + Number(product.price), 0).toFixed(2)}</span>
          <button className='btn btn-warning ' onClick={fnPlaceOrder}>Place Order</button>
        </div>
      </div>
    )
  )
}

export default Cart