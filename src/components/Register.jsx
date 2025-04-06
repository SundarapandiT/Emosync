import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";

const Register = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Hash the password before storing it
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(password, salt);

    // Check if email already exists
    const { data: existingUser, error: userCheckError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      setMessage("Email already registered. Please login.");
      return;
    }

    if (userCheckError && userCheckError.code !== "PGRST116") {
      setMessage("Error checking existing user.");
      return;
    }

    // Insert user into the database
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, name, password }])
      .select()
      .single();

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Registration successful! Redirecting...");
    //   setUser(data); // Store user data in state
      navigate("/login"); // Redirect to homepage
    }
  };

  return (
    <div className="auth-container">
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
    {message && <p className="message">{message}</p>}
    <p 
      onClick={() => navigate("/login")} 
      className="login-link"
    >
      Already have an account? Login here
    </p>
  </div>
  
  );
};

export default Register;
