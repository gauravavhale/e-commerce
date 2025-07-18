"use client"
import React from 'react'
import useFetchProducts from '@/Hooks/useFetchProducts'
import { Cards } from './Cards'
import { SkeletonCards } from '@/Components/Skeleton/Skeleton'

const ProductList = ({url}) => {
  
  const{products,error,loading} = useFetchProducts(url)

  return (
    <div>
        {loading ? (
        <div className="container py-5">
            <SkeletonCards count={6} />
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