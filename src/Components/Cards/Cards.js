// components/Card.js
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './Cards.module.css';
import Link from 'next/link';
import { appStore } from '@/redux/store/store';

export const Cards = ({products}) => {

  const [cartProducts,setCartProducts] = useState([])

  useEffect(()=>{
    appStore.dispatch({type:"Cart",payload:cartProducts})
  },[cartProducts])

  const fnAddtoCart = (product) => {
    setCartProducts(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev; // already in cart
      }
      return [...prev, product];
    });
  }


  // Generate star icons based on rating
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
            className="bi bi-star-fill text-muted"
            style={{ marginRight: '2px' }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="cards-container flex flex-wrap gap-4 m-3 mt-4 justify-content-center" >
    {products?.map((product)=>{
        return(
        <div className="card overflow-hidden" key={product.id} style={{ width:"300px", height:"485px"}}>
        <Link href={`/preview/${product.id}`}><Image src={product.image} className="card-img-top p-4 " width={288} height={240} alt={product.title} /></Link>
        <div className="card-body " style={{height:"200px"}}>
        <h5 className="card-title text-truncate">{product.title}</h5>
        <p className="card-text overflow-hidden mb-1" style={{height:"75px"}}>{product.description}</p>
        <p className="card-text text-success fw-bold mb-1 pl-0">${product.price}</p>
        <button className={` mb-2 ${styles.cart}`} onClick={()=>fnAddtoCart(product)}>Add to Cart</button>
        <div className="d-flex align-items-center">
          {renderStars(product.rating)}
          <span className="ms-2">({product.rating.rate}/5)</span>
        </div>
       </div>
       </div>
        )
    })}
    </div>
  );
};
