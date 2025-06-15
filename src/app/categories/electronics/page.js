"use client"
import React from 'react'
import ProductList from '@/Components/ProductList'

const electronics = () => {

  return (
    <ProductList url={"https://fakestoreapi.com/products/category/electronics"}/>
  )
}

export default electronics