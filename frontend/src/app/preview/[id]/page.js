"use client"
import React, { useEffect } from 'react'
import styles from './preview.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'

const Preview = ({params}) => {

    const {id} = params

    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.appReducer.CartData)
    
    const [product, setProducts] = React.useState(null)

    // useEffect(()=>{
    //   dispatch({type:"Cart",payload:cartProducts})
    // },[cartProducts, dispatch])
    
    
    const addToCart = (product) => {
      // Add to Redux cart, prevent duplicates
      if (!cartProducts.find(item => item.id === product.id)) {
        dispatch({ type: 'Cart', payload: [...cartProducts, product] })
      }
      const button = document.getElementById('add');
      button.classList.add(styles.clicked)
      toast.success('Added to cart')
      button.innerText = 'Added'
      setTimeout(()=>{
        button.classList.remove(styles.clicked)
      },200)
    }

    useEffect(()=>{
    if(id){
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/product-by-id/${id}`)
        .then((res)=>res.json())
        .then((data)=>{ setProducts(data)})
        .catch((e)=>{console.log(e)})
        }   
    },[id])

    if(!product) return (
        <div className="d-flex justify-content-center align-items-center mb-3 vh-100">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        </div>
    )

    const renderStars = (rating) => {
    const ratingValue = typeof rating === 'object' && rating.rate ? rating.rate : rating;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(ratingValue)) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill text-success"
            style={{ marginRight: '2px' }}
          />
        );
      } else if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
        stars.push(
          <i
            key={i}
            className="bi bi-star-half text-success"
            style={{ marginRight: '2px' }}
          />
        );
      } else {
        stars.push(
          <i
            key={i}
            className="bi bi-star-fill text-warning"
            style={{ marginRight: '2px' }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-3 mt-5 pb-5">
  <div
    className="card shadow-lg border-0 overflow-hidden w-100"
    style={{ maxWidth: "960px", borderRadius: "16px" }}
  >
    <div className="row g-0">
      {/* Image Section */}
      <div
        className="col-12 col-md-6 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={280}
          className="p-4"
          style={{ objectFit: "contain", maxHeight: "320px" }}
        />
      </div>

      {/* Info Section */}
      <div className="col-12 col-md-6 p-4 d-flex flex-column justify-content-between">
        <div>
          <h4 className="fw-semibold text-dark mb-2 text-truncate" title={product.title}>
            {product.title}
          </h4>
          <p className="text-muted small" style={{ maxHeight: "150px", overflowY: "auto" }}>
            {product.description}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-success fw-bold fs-5 mb-2">${product.price}</p>
          <button
            id="add"
            className={`btn btn-dark w-100 py-2 mb-3 ${styles.cart}`}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <div className="d-flex align-items-center justify-content-center">
            {renderStars(product.rating)}
            <span className="ms-2 small text-muted">({product.rating.rate}/5)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Preview