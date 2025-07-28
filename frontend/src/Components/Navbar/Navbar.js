"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { useSelector } from 'react-redux'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const data = useSelector((state) => state.appReducer.CartData)


  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg px-3 fixed-top shadow-sm ${styles.navbar}`}>
  <div className="container-fluid d-flex justify-content-between align-items-center flex-nowrap">

    {/* Brand */}
    <Link href="/" className="navbar-brand" onClick={closeMenu}>
      <span className={styles.brandText}>SwiftCart</span>
    </Link>

    {/* Toggle button for mobile */}
    {isMobile && (
      <>
      <Link href="/cart" className="position-relative text-decoration-none text-dark" onClick={closeMenu}>
                <i className="bi bi-cart3 me-1 fs-5"></i><b>Cart</b>
                {data.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {data.length}
                  </span>
                )}
              </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      </>
    )}

    {/* Collapsible menu */}
    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
      <ul className="navbar-nav gap-4 text-center mx-auto">
        {[ 
          { label: 'MEN', path: '/categories/mens' },
          { label: 'WOMEN', path: '/categories/women' },
          { label: 'JEWELERY', path: '/categories/jewelery' },
          { label: 'ELECTRONICS', path: '/categories/electronics' }
        ].map((item) => (
          <li className="nav-item" key={item.label}>
            <Link href={item.path} className="nav-link fw-semibold text-dark" onClick={closeMenu}>
              {item.label}
            </Link>
          </li>
        ))}

        {/* Show Login & Cart in collapsed menu on mobile */}
        {isMobile && (
          <>
            <li className="nav-item mt-3">
              <Link href="/auth/login" className={`${styles.btnLogin} d-inline-flex align-items-center`} onClick={closeMenu}>
                <i className="bi bi-person-circle me-1"></i><b>Login</b>
              </Link>
            </li>
            <li className="nav-item mt-2">
              <Link href="/cart" className="position-relative text-decoration-none text-dark" onClick={closeMenu}>
                <i className="bi bi-cart3 me-1 fs-5"></i><b>Cart</b>
                {data.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {data.length}
                  </span>
                )}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>

    {/* Show Login & Cart on the right for desktop only */}
    {!isMobile && (
      <div className="d-flex align-items-center gap-3">
        <Link href="/auth/login" className={`${styles.btnLogin} d-flex align-items-center`} onClick={closeMenu}>
          <i className="bi bi-person-circle me-1"></i><b>Login</b>
        </Link>
        <Link href="/cart" className="position-relative text-decoration-none text-dark" onClick={closeMenu}>
          <i className="bi bi-cart3 me-1 fs-5"></i><b>Cart</b>
          {data.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {data.length}
            </span>
          )}
        </Link>
      </div>
    )}
  </div>
</nav>

  )
}
