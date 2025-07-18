import React from 'react';
import styles from '../Cards/Cards.module.css';

export const SkeletonCards = ({ count = 6 }) => {
  return (
    <div className={`${styles.cards} cards-container pt-2 pb-4`}>
      {[...Array(count)].map((_, idx) => (
        <div className="card overflow-hidden" key={idx} style={{ width: "300px", height: "485px" }}>
          <div className="card-img-top m-2 p-4 bg-secondary placeholder" style={{ width: "288px", height: "240px", opacity: 0.2 }} />
          <div className="card-body" style={{ height: "200px" }}>
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-8"></span>
            </h5>
            <p className="card-text placeholder-glow mb-1" style={{ height: "75px" }}>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-10"></span>
            </p>
            <p className="card-text placeholder-glow mb-1 pl-0">
              <span className="placeholder col-4"></span>
            </p>
            <button className={`mb-2 ${styles.cart} placeholder col-6`} disabled></button>
            <div className="d-flex align-items-center mt-2">
              <span className="placeholder col-4"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};