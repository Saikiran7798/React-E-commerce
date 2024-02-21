import React from 'react'
import './CSS/LoginSingup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h2>Sign Up</h2>
        <div className="loginsignup-fields">
          <input type='text' placeholder='Your name' />
          <input type="email" placeholder='Email Address'/>
          <input type="password" placeholder='Password' />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing I agree to the terms of use & privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup