"use client"
import React from 'react'
import ProductList from '@/Components/ProductList'

const jewelery = () => {
  return (
    <ProductList url={`${process.env.NEXT_PUBLIC_API_URL}/products/products-by-category/jewelery`}/>
  )
}

export default jewelery;