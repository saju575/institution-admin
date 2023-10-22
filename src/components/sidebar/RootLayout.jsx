import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Topbar from '../topbar/Topbar'

const RootLayout = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RootLayout