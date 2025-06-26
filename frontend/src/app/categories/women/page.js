"use client"
import React from 'react'
import ProductList from '@/Components/ProductList'

const women = () => {

  return (
    <ProductList url={`${process.env.NEXT_PUBLIC_API_URL}/products/products-by-category/women's clothing`}/>
  )
}

export default women