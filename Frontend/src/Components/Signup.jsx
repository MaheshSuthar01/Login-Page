import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Style/Signup.css";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  const handleSubmit = () => {
    // Clear previous error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Basic validation
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be uppercase letter, lowercase letter, number, and special character."
      );
      isValid = false;
    }

    if (!isValid) return;

    // Proceed with signup if validation passes
    axios
      .post("http://localhost:5000/signup", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.response.data);
        setGeneralError(
          "An error occurred: " +
            (err.response.data.message || "Please try again.")
        );
      });
  };


  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {generalError && (
        <p style={{ color: "red", textAlign: "center" }}>{generalError}</p>
      )}

      <input
        type="text"
        name="user"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <div className="error-msg1">
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
      </div>

      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div className="error-msg2">
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password"
      />
     
      <div className="error-msg3">
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </div>

      <button onClick={handleSubmit} className="signup-btn">
        Sign Up
      </button>
      <div className="signup-link-con">
        <p>Already have an account?</p>
        <Link to="/signin" className="signup-link">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Signup;
