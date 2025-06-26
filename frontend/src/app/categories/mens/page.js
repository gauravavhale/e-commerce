"use client"
import React from 'react'
import ProductList from '@/Components/ProductList'

const mens = () => {
  return <ProductList url={`${process.env.NEXT_PUBLIC_API_URL}/products/products-by-category/men's clothing`}/>
}

export default mens