"use client"
import React from 'react'
import ProductList from '@/Components/ProductList'

const electronics = () => {

  return (
    <ProductList url={`${process.env.NEXT_PUBLIC_API_URL}/products/products-by-category/electronics`}/>
  )
}

export default electronics