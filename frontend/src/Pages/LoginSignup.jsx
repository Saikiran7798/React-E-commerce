import React, { useState } from 'react'
import './CSS/LoginSingup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: ""
  })
  const [showError, setShowError] = useState('')
  const navigate = useNavigate()
  const changeHandler = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const login = async () => {
    let formdata = formData
    try{
      const response = await axios.post('http://localhost:4000/login',{
          email: formdata.email,
          password: formdata.password,
      })
      localStorage.setItem('auth-token', response.data.token)
      console.log("logged in", response)
      setShowError('')
      navigate('/')
    }catch(error) {
      console.log(error)
      setShowError(error.response.data.error)
    }
  }
  const signup = async () => {
    let data = formData
    console.log(data)
    try{
      const response = await axios.post('http://localhost:4000/signup',data)
      localStorage.setItem('auth-token', response.data.token)
    } catch(error){
      setShowError(error.response.data.error)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h2>{showLogin? 'Login' : 'Sign Up'}</h2>
        <div className="loginsignup-fields">
          {!showLogin? <input onChange={changeHandler} type='text' placeholder='Your name' name='name' /> : null}
          <input onChange={changeHandler} type="email" placeholder='Email Address' name='email'/>
          <input onChange={changeHandler} type="password" placeholder='Password' name='password' />
        </div>
        <button onClick={() => {
          if(showLogin) {
            return login()
          }
          else {
            return signup()
          }
        }}>Continue</button>
        <p className="loginsignup-login">
         {showLogin? "Don't have and Account?" : "Already have an Account?"}<span onClick={() => setShowLogin(!showLogin)}>{showLogin? 'Sign Up' : 'Login here'}</span>
        </p>
        {/* <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing I agree to the terms of use & privacy Policy</p>
        </div> */}
        <p>{showError}</p>
      </div>
    </div>
  )
}

export default LoginSignup