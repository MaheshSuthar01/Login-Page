import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/NewSubmit.css";

function NewSubmit() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Reset error messages
    setOtpError("");
    setPasswordError("");

    // Validate OTP
    if (otp.trim() === "") {
      setOtpError("OTP is required.");
      isValid = false;
    }

    // Validate Password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be uppercase letter, lowercase letter, number, and special character."
      );
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return; // If validation fails, don't proceed with the submission
    }

    console.log(otp, password);
    axios
      .post("http://localhost:5000/submit-otp", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="new-pass-container">
      <h1>Change Password</h1>
      <input
        type="text"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        placeholder="Enter OTP"
      />
      <div className="errorMsg1">
       {otpError && <p className="error">{otpError}</p>}
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="New Password"
      />
      <div className="errorMsg2">
        {passwordError && <p className="error">{passwordError}</p>}
      </div>

      <button className="change-pass-btn" onClick={handleSubmit}>
        Change Password
      </button>
    </div>
  );
}

export default NewSubmit;
