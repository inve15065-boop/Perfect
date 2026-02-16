import React, { useState } from "react";
import { getSkills } from "../../api/skills/api";

// FIX: define API using your backend URL
import axios from "axios";
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Make sure this is set in .env and Netlify
});

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      alert("Registered successfully");
      console.log(res.data);
    } catch (err) {
      alert("Registration failed");
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br /><br />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
