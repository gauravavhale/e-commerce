import React from 'react';
import styles from '../Cards/Cards.module.css';

export const SkeletonCards = ({ count = 6 }) => {
  return (
    <div className={`${styles.cards} cards-container pt-3 pb-5 d-flex flex-wrap gap-4 justify-content-center`}>
  {[...Array(count)].map((_, idx) => (
    <div
      className="card shadow-sm border-0 overflow-hidden"
      key={idx}
      style={{ width: "300px", height: "485px", borderRadius: "16px" }}
    >
      {/* Image Skeleton */}
      <div
        className="card-img-top bg-secondary placeholder-glow rounded m-3"
        style={{ width: "calc(100% - 32px)", height: "240px", opacity: 0.1 }}
      ></div>

      {/* Body Skeleton */}
      <div className="card-body d-flex flex-column justify-content-between px-3 py-2" style={{ height: "200px" }}>
        <div className="placeholder-glow">
          <h5 className="card-title mb-2">
            <span className="placeholder col-8 rounded"></span>
          </h5>
          <p className="card-text mb-2">
            <span className="placeholder col-12 mb-1 rounded"></span>
            <span className="placeholder col-10 rounded"></span>
          </p>
          <p className="card-text">
            <span className="placeholder col-4 rounded"></span>
          </p>
        </div>

        {/* Button & Rating Placeholder */}
        <div className="mt-3 placeholder-glow">
          <span className="placeholder col-6 py-2 rounded-pill d-block mb-3"></span>
          <span className="placeholder col-4 rounded d-block"></span>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};