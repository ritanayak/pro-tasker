import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",        
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //call your backend
      const { data } = await API.post("/auth/register", form);

      //store token
      localStorage.setItem("token", data.token);

      // update context
      login(data);

      //  redirect to dashboard
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          required
        />

        <label>Email:</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
        />

        <label>Password:</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;