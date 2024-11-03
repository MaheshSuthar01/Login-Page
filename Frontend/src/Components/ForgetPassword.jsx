import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Style/ForgetPassword.css'

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = () => {
    if (!email) {
      setErrorMessage("Email are required.");
      return;
    }
    console.log(email);
    axios
      .post("http://localhost:5000/send-otp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate("/otp");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="for-container">
        <h1>Forget Password</h1>
        
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <div className="error">
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
        
        <button className="otp-btn" onClick={handleSubmit}>
          Send OTP
        </button>
      </div>
    </>
  );
}

export default ForgetPassword;
