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

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => isMobile && setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className={`fixed-top shadow-sm px-3 ${styles.navbar}`}>
      {/* === TOP BAR ALWAYS VISIBLE === */}
      <div className="container-fluid d-flex justify-content-between align-items-center py-2">
        {/* Brand */}
        <Link href="/" className="navbar-brand m-0" onClick={closeMenu}>
          <span className={styles.brandText}>SwiftCart</span>
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
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
          </ul>
        )}

        {/* Right Side: Cart + Login */}
        <div className="d-flex align-items-center gap-3">
          {!isMobile && (
            <Link href="/auth/login" className={`${styles.btnLogin} d-flex align-items-center`} onClick={closeMenu}>
              <i className="bi bi-person-circle me-1"></i><b>Login</b>
            </Link>
          )}

          <Link href="/cart" className="position-relative text-decoration-none text-dark" onClick={closeMenu}>
            <i className="bi bi-cart3 me-1 fs-5"></i><b>Cart</b>
            {data.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {data.length}
              </span>
            )}
          </Link>

          {/* Hamburger for mobile */}
          {isMobile && (
            <button
              className="btn p-0 border-0"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-1 fw-bold text-dark"></i>
            </button>
          )}
        </div>
      </div>

      {/* === COLLAPSIBLE MENU FOR MOBILE === */}
      {isMobile && isOpen && (
        <div className="bg-white shadow-sm px-3 py-3">
          <ul className="navbar-nav text-center gap-3">
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
            <li className="nav-item mt-2">
              <Link href="/auth/login" className={`${styles.btnLogin} d-inline-flex align-items-center`} onClick={closeMenu}>
                <i className="bi bi-person-circle me-1"></i><b>Login</b>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
