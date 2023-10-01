import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  let submit = () => {
    let data = {
      email,
      password
    }
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      if (data.success) {
        console.log(data.data.token)
        localStorage.setItem('userData', JSON.stringify(data.data));
        if (data.data.role === 'admin') {
          navigate('/adminDashboard', { replace: true });
        }
        if (data.data.role === 'enduser') {
          navigate('/enduserDashboard', { replace: true });
        }
        if (data.data.role === 'account_manager') {
          navigate('/accountmangerDashboard', { replace: true });
        }
        if (data.data.role === 'reseller') {
          navigate('/resellerDashboard', { replace: true });
        }
      } else {
        alert("invalid credentials")
      }

    }).catch((err) => {
      console.log('error', err)
    })
  }
  return (
    <>
      <div className="row">
        <form className='col-6 offset-3 mt-5'>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input autoFocus type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="button" onClick={submit} className="btn btn-primary">Submit</button>
        </form>
      </div>


    </>
  )
}
