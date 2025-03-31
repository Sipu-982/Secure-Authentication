import React, { useState } from 'react'
import "./Login.css"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';

const Login = () => {
   const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
    
    const navigate=useNavigate();
      const [errors, setErrors] = useState({});
      const validateForm = () => {

        let newErrors = {};
        if (!fullname.trim()) newErrors.fullname = "Full name is required";

        if (!email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
          newErrors.email = "Enter a valid email";
        }
     if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Function to clear form fields
  const clearForm = () => {
    setFullname("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

    const Submit = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const result = await axios.post("http://localhost:3001/login", {
            fullname,
            email,
            password,
          });
          console.log(result);
        if(result.data==="Success"){
          alert("Login Successfull!");
      clearForm();
          navigate('/')
        }
        else{
          alert("Inavlid user Credential . Please try again.");

        }
          setFullname("");
          setEmail("");
          setPassword("");
          setErrors({});
        } 
        catch (err) {
          console.log(err);
        }
      }
      };
  return (
    <div className=' w-full min-h-[100vh] flex justify-center items-center'>
        <div className='form-content w-[460px] min-h-[400px]  rounded-lg  border-1 border-blue-200 '>
            <h2 className='login-title font-bold text-3xl text-center p-3'>Login</h2>
            <form onSubmit={Submit}>
          <div className="data-field">
            <input type="text"  id="fullname" value={fullname}  onChange={(e) => setFullname(e.target.value)} autoComplete="off"  placeholder="Enter fullname" />
            {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
          </div>
          <div className="data-field">
            <input
              type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" placeholder="Enter email" />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="data-field">
            <input  type="password" id="password"  value={password}  onChange={(e) => setPassword(e.target.value)}  autoComplete="off"  placeholder="Enter valid password"  />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
            <div className='data-field'>
                <button className='p-2 cursor-pointer w-24 bg-black text-lg rounded-sm shadow-lg shadow-neutral-800 text-white transition duration-500 hover:bg-cyan-400'>Login</button>
           </div>
           <div className='flex justify-center gap-2 text-lg text-white '>
           <p className='text-green-300 font-semibold'>New user?</p> <Link to="/register" className='transition duration-500 hover:text-blue-600'>register here</Link>
           </div>
           <div className='text-left pt-4'>
            <Link to='/' className='text-lg text-green-400 border-b-1 '>Back to Home</Link>
           </div>
            </form>
        </div>
    </div>
  )
}

export default Login