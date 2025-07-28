// components/Card.js
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from './Cards.module.css';
import Link from 'next/link';
import { appStore } from '@/redux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast';

export const Cards = ({products}) => {
  // Use Redux cart state
  const cartProducts = useSelector((state) => state.appReducer.CartData);
  const dispatch = useDispatch();

  useEffect(()=>{
    appStore.dispatch({type:"Cart",payload:cartProducts})
  },[cartProducts])

  const fnAddtoCart = (product) => {
    // Add to Redux cart, prevent duplicates
    if (!cartProducts.find(item => item.id === product.id)) {
      dispatch({ type: 'Cart', payload: [...cartProducts, product] });
    }
    const addButton = document.getElementById(`add-btn-${product.id}`);
    if(addButton){
      toast.success("Added to cart")
      addButton.classList.add(styles.clicked);
      addButton.innerText = "Added";
      setTimeout(()=>{
        addButton.classList.remove(styles.clicked);
      },200);
    }
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
            className="bi bi-star-fill text-warning"
            style={{ marginRight: '2px' }}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={`${styles.cards} cards-container pt-3 pb-5 d-flex flex-wrap gap-4 justify-content-center`}>
  {products?.map((product) => {
    return (
      <div
        className="card border-0 shadow-sm overflow-hidden"
        key={product.id}
        style={{ width: '300px', height: '500px', borderRadius: '16px' }}
      >
        <Link href={`/preview/${product.id}`} className="text-decoration-none">
          <Image
            src={product.image}
            className="card-img-top p-3"
            width={288}
            height={240}
            alt={product.title}
            style={{ objectFit: 'contain', height: '240px' }}
          />
        </Link>
        <div className="card-body d-flex flex-column justify-content-between px-3" style={{ height: '240px' }}>
          <div>
            <h6 className="card-title fw-semibold text-dark text-truncate" title={product.title}>
              {product.title}
            </h6>
            <p
              className="card-text small text-muted"
              style={{
                maxHeight: '60px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.description}
            </p>
            <p className="card-text text-success fw-bold fs-6 mt-1">${product.price}</p>
          </div>
          <div>
            <button
              id={`add-btn-${product.id}`}
              className={`btn btn-dark w-100 py-2 mt-1 ${styles.cart}`}
              onClick={() => fnAddtoCart(product)}
            >
              Add to Cart
            </button>
            <div className="d-flex align-items-center justify-content-center mt-2">
              {renderStars(product.rating)}
              <span className="ms-2 small text-muted">({product.rating.rate}/5)</span>
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

  ); 
};
