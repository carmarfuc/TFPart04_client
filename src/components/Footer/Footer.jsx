import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation()
  return (
    <>
      {pathname === '/' ? '' :
        <footer className="footer footer-center p-4 bg-primary text-base-content min-h-[107px] inset-x-0 bottom-0">
          <div className="">
            <p>Copyright © 2022 - All right reserved by Henry</p>
          </div>
        </footer>
      }
    </>

  )
}

export default Footer
// 