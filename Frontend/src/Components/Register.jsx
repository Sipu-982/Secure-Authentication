import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
const navigate=useNavigate();
  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!fullname.trim()) newErrors.fullname = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number should be 10-15 digits";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || parseInt(age) <= 0) {
      newErrors.age = "Enter a valid age";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } 

        setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await axios.post("http://localhost:3001/register", {
          fullname,
          email,
          phone,
          age,
          password,
        });
        console.log(result.data);
        alert("User registered successfully!");
         navigate('/login')
        setFullname("");
        setEmail("");
        setPhone("");
        setAge("");
        setPassword("");
        setErrors({});
      } 
      catch (err) {
        console.log(err);
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="container w-full min-h-[100vh] flex justify-center items-center">
      <div className="form-content w-[460px] min-h-[400px] rounded-lg border border-blue-200">
        <h2 className="login-title font-bold text-3xl text-center p-3">
          Registration
        </h2>
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
            <input type="tel"   id="phone"   value={phone}  onChange={(e) => setPhone(e.target.value)} autoComplete="off"  placeholder="Enter phone number" />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div className="data-field">
            <input type="text" id="age" value={age}  onChange={(e) => setAge(e.target.value)}  autoComplete="off"  placeholder="Enter age"   min="1" />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <div className="data-field">
            <input  type="password" id="password"  value={password}  onChange={(e) => setPassword(e.target.value)}  autoComplete="off"  placeholder="Enter new password"  />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="data-field">
            <input type="password" id="confirm-password"   autoComplete="off" placeholder="Repeat password"  />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="data-field">
            <button className="p-2 cursor-pointer w-24 bg-black text-lg rounded-sm shadow-lg shadow-neutral-800 text-white transition duration-500 hover:bg-cyan-400">
              Submit
            </button>
          </div>
          <div className="flex justify-center gap-2 text-lg text-white">
            <p className="text-black font-semibold">Already have an account?</p>
            <Link to="/login" className="transition duration-500 hover:text-blue-600">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
