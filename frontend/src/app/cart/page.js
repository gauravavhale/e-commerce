"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styles from './cart.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'
import Link from 'next/link'

const Cart = () => {
  const router = useRouter()

  // Access the cart data from the Redux store
  const cartProducts = useSelector((state) => state.appReducer?.CartData || [])
  const dispatch = useDispatch()

  const handleRemove=(id)=>{
    toast.success('Item Removed')
    const updatedCart = cartProducts.filter((product)=>product.id !== id)
    dispatch({type:"Cart",payload:updatedCart})
  }

  const fnPlaceOrder=()=>{
    const user = JSON.parse(localStorage.getItem('USer'))
    if(user && user.token){
      dispatch({type:"Cart",payload:[] });
      toast.success('Order Placed')
      router.push('/')
    } else {
      toast('Login to make a Order')
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
  <div className="d-flex flex-column justify-content-center align-items-center vh-100 pb-5 text-center">
    <img
      src="/images/empty-cart.png"
      alt="Empty Cart"
      width={200}
      height={200}
      className="mb-4"
    />
    <h4 className="mb-3 text-muted">Your cart is empty</h4>
    <p className="text-secondary">Looks like you {`haven’t`} added anything to your cart yet.</p>
    <Link href="/" className="btn btn-primary mt-3">
      Start Shopping
    </Link>
  </div>
)  : (
      <div>
  {/* Cart Product List */}
  <div
    style={{
      maxHeight: '70vh',
      overflowY: 'auto',
      maxWidth: '800px',
      margin: '0 auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}
    className="p-3"
  >
    {cartProducts.map((product, index) => (
      <div className="card mb-3 shadow-sm border-0" key={index} style={{ borderRadius: '12px' }}>
        <div className="row g-0 align-items-center">
          {/* Product Image */}
          <div className="col-4 col-sm-3 p-3 d-flex justify-content-center align-items-center">
            <Image
              src={product.image}
              width={90}
              height={90}
              className="img-fluid rounded"
              style={{ objectFit: 'contain', maxHeight: '90px' }}
              alt={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="col-8 col-sm-9 p-3 d-flex flex-column justify-content-center">
            <h6 className="fw-semibold text-dark mb-1 text-truncate" title={product.title}>
              {product.title}
            </h6>
            <div className="text-success small d-flex align-items-center mb-2">
              {renderStars(product.rating)}
              {product.rating?.rate && <span className="ms-2">({product.rating.rate}/5)</span>}
            </div>
            <div className="mb-2">
              <strong className="text-success fs-6">${product.price}</strong>
            </div>
            <button
              className={`btn btn-sm btn-outline-danger  px-3 py-1 ${styles.rmvButton}`}
              onClick={() => handleRemove(product.id)}
              style={{width:'fit-content', fontSize:'0.8rem'}}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Total & Order Section */}
  <div
    className="d-flex justify-content-between align-items-center px-4 py-3 border-top"
    style={{
      height: '65px',
      background: '#2874f0',
      position: 'sticky',
      bottom: 0,
      zIndex: 10,
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '12px'
    }}
  >
    <span className="text-white fw-bold fs-6">
      Total: $
      {cartProducts.reduce((total, product) => total + Number(product.price), 0).toFixed(2)}
    </span>
    <button className="btn btn-warning px-4 py-2 fw-semibold" onClick={fnPlaceOrder}>
      Place Order
    </button>
  </div>
</div>

    )
  )
}

export default Cart