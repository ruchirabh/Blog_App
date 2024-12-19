import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // ✅ Call useNavigate at the top
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/validate",
        userData
      );
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");

      setTimeout(() => {
        navigate("/mainpage");
      }, 2000);
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      setSuccessMessage("");
    }
  };
  const taketoreset = async () => {
    navigate("/reset");
  }
  

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "300px" }}>
          <div className="card-body">
            <h5 className="card-title text-center pb-3">Login</h5>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  style={{ boxShadow: "none" }}
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  style={{ boxShadow: "none" }}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Login
              </button>
            </form>
          </div>
          <button
            className=" btn btn-link btn-sm"
            style={{
              marginLeft: "150px",
              marginTop: "10px",marginBottom:"10px",

              fontSize: "12px",
            }}
            onClick={taketoreset}

          >
            forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
