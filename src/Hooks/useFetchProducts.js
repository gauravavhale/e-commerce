import React, {useEffect, useState} from "react";
import $ from "jquery";

const useFetchProducts=(url)=>{

  const [products,setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{

    const fnGetProduct=()=>{
    setLoading(true)
    setError(null)
    setProducts([])
      $.ajax({
        url,
        method:"GET",
        dataType:"json",
        success:(data)=>{
          setProducts(data);
          setLoading(false);
        },
        error:( textStatus, errorThrown)=>{
          alert(`Failed to fetch the data ${textStatus} ${errorThrown}`)
          setLoading(false) 
        },
      })
    }

    fnGetProduct()
  },[url])
  return {products,loading,error}
}
export default useFetchProducts;