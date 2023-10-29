import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Topbar from '../topbar/Topbar'

import { useLocation } from 'react-router-dom'

const RootLayout = () => {

  const location = useLocation();

  if (location === '/login') {
    return <div>
      <Outlet />
    </div>
  }

  return (
    <div>
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RootLayout