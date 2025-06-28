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
    <div className=" d-flex justify-content-center align-content-center gap-4 m-3 mt-5 pb-4">
    <div className="card overflow-hidden" key={product.id} style={{ maxWidth: "900px" }}>
    <div className="row g-0">
    {/* Image section */}
    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center" style={{ background: "#ffffff" }}>
      <Image
        src={product.image}
        className="p-3"
        width={400}
        height={250}
        alt={product.title}
        style={{ objectFit: "contain", maxHeight: "300px" }}
      />
    </div>

    {/* Info section */}
    <div className="col-12 col-md-6 d-flex flex-column justify-content-between p-3">
      <div>
        <h5 className="card-title text-truncate">{product.title}</h5>
        <p className="card-text">{product.description}</p>
      </div>
      <div>
        <p className="card-text text-success fw-bold mb-1">${product.price}</p>
        <button id='add' className={`mb-2 ${styles.cart}`} onClick={()=>{addToCart(product)}}>Add to Cart</button>
        <div className="d-flex align-items-center">
          {renderStars(product.rating)}
          <span className="ms-2">({product.rating.rate}/5)</span>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
  )
}

export default Preview