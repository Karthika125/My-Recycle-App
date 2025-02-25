import { useState } from "react";
import { supabase } from "../../backend/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("Signing up user with email:", email);

    // Create user without email verification
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup Error:", error.message);
      setError(error.message);
      return;
    }

    console.log("Signup Success:", data);

    // Store user details in the 'users' table
    const { error: dbError } = await supabase.from("users").insert([
      { id: data.user?.id, username, email },
    ]);

    if (dbError) {
      console.error("Database Insert Error:", dbError.message);
      setError(dbError.message);
      return;
    }

    console.log("User stored in database successfully.");
    
    // Show success alert
    alert("Signup successful! Redirecting to login...");

    // Redirect to login after successful signup
    setTimeout(() => navigate("/login"), 1000);
    console.log("Redirecting to login...");


  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
