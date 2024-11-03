import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../Style/Signin.css';

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    // Clear previous error messages
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return; // Stop if any validation failed

    console.log(email, password);
    axios
      .post("http://localhost:5000/signin", { email, password })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 404) {
          alert("User not found");
        }
        if (res.data.code === 401) {
          alert("Password incorrect");
        }
        if (res.data.code === 500) {
          alert("Server error");
        }
        if (res.data.code === 200) {
          // Move to home page
          navigate("/");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signin-container">
      <h1>Signin</h1>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div className="error1">
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="error2">
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </div>

      <Link className="for-pass" to={"/forget-pass"}>Forget Password</Link>
      <button className="signin-btn" onClick={handleSubmit}>Sign In</button>
      <div className="signin-link-con">
        <p>Don&apos;t have an account?</p>
        <Link className="sign-link" to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

export default Signin;
