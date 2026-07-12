'use client'
import { baseUrl } from "../_utils/config";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import "./login.css"

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  deleteCookie('user')

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

const navigate=useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(baseUrl+"/api/auth/loginadmin",{headers:{'Content-Type': 'application/json'},method:"post",body:JSON.stringify(formData)})
    .then(res=>res.json())
    .then(res=>{setCookie('user',JSON.stringify(res.data))
navigate.replace('/')

    })
    .catch(e=>console.log(e))
 };

  return (
    <div  className='register-login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
    
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
     
        <button  type="submit">Login</button>

      </form>
    </div>
  );
};

export default LoginPage;
