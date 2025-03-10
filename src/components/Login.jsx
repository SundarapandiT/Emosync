import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fetch user from the manual 'users' table
    const { data, error } = await supabase
      .from("users")
      .select("email, password, name")
      .eq("email", email)
      .single();

    if (error || !data) {
      setMessage("User not found!");
      return;
    }
     // Compare the entered password with the stored hashed password
    //  const isPasswordValid = bcrypt.compareSync(password, data.password);

    // Simple password check (⚠️ In production, use hashed passwords)
    if (data.password !==password) {
      setMessage("Incorrect password!");
      return;
    }

    // Store user info in local storage or state management
    localStorage.setItem("user", JSON.stringify(data));

    setMessage(`Welcome ${data.name}!`);
    navigate("/");
    window.location.reload();
    
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <br />
      <p
        onClick={() => navigate("/register")}
        style={{ cursor: "pointer", color: "pink", textDecoration: "underline" }}
      >
        Don't have an account? Signup here
      </p>
    </div>
  );
};

export default Login;
