import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <React.Fragment>
      <div id="login">
        <div className="login-wrapper my-14">

          {/* Login Form */}
          <div className='login-inner bg-[#E8E8E8] py-14 px-4 sm:px-6 md:px-8 lg:px-10'>
            <h3 className='text-center text-xl capitalize font-semibold mb-8'>Login to your account</h3>
            <div className='login-innerFrom'>
              <input type="text" className='px-5 py-4 my-2 outline-none' placeholder='User Name:' />
              <input type="password" className='px-5 py-4 my-2 outline-none' placeholder='Password:' />
              <a href="##" className='w-full bg-[#79929C] my-2 text-center text-white text-lg py-4'>Login</a>
              <p className='cursor-pointer underline capitalize text-lg font-medium text-end mt-4'>reset your password</p>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}

export default Login;