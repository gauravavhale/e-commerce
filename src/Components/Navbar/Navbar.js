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
    <nav className={`navbar navbar-expand-lg px-1 fixed-top ${styles.navbar}`}>
      <div className="container-fluid">
        
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <Image src="/images/SwiftCart1.png" width={50} height={50} alt="SwiftCart Logo" onClick={closeMenu}/>
        </Link>


        {/* Collapsible Section */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center gap-4">
            <li className="nav-item">
              <Link href="/categories/mens" className="nav-link fw-bold text-dark" onClick={closeMenu}>MEN</Link>
            </li>
            <li className="nav-item">
              <Link href="/categories/women" className="nav-link fw-bold text-dark" onClick={closeMenu}>WOMEN</Link>
            </li>
            <li className="nav-item">
              <Link href="/categories/jewelery" className="nav-link fw-bold text-dark" onClick={closeMenu}>JEWELERY</Link>
            </li>
            <li className="nav-item">
              <Link href="/categories/electronics" className="nav-link fw-bold text-dark" onClick={closeMenu}>ELECTRONICS</Link>
            </li>
          </ul>
        </div>

        {/* Right side login & cart */}
          <div className={`d-flex flex-row justify-content-center align-items-center gap-4`}>
            <Link title="Login" href="/auth/login" className={styles.btnLogin} onClick={closeMenu}>
              <i className="bi bi-person-circle fw-bold"></i> <b> Login</b>
            </Link>
            <Link href="/cart" className="text-decoration-none text-dark me-2 position-relative" onClick={closeMenu}>
              <i className="bi bi-cart3 me-2 fw-bold"></i><b>Cart</b>
              {data.length > 0 && (
                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                  {data.length}
                </span>
              )}
            </Link>
          </div>
        

          {/* Toggle Button (hide on large screens) */}
        {isMobile && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

      </div>
    </nav>
  )
}
