"use client"
import React, { useEffect, useState } from 'react'
import { Cards } from '@/Components/Cards'
import $ from 'jquery'

const App = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    $.ajax({
      url:`${process.env.NEXT_PUBLIC_API_URL}/products/get-products`,
      method:"GET",
      dataType: "json",
      success:(data)=>{setProducts(data), setLoading(false) },
      error:(jqXHR, textStatus, errorThrown)=>{setError(`Failed to fetch the data ${textStatus} ${errorThrown}`)}
    })

  },[])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          No products available.
        </div>
      </div>
    );
  }


  return (
    <div>
      <Cards
          products = {products}
          />
    </div>
  )
}

export default App