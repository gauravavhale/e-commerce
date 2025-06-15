"use client"
import React from 'react'
import useFetchProducts from '@/Hooks/useFetchProducts'
import { Cards } from './Cards'

const ProductList = ({url}) => {
  
  const{products,error,loading} = useFetchProducts(url)

  return (
    <div>
        {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
        </div>

      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : products.length > 0 ? (
        <Cards products={products} />
      ) : null}
    </div>
  )
}

export default ProductList