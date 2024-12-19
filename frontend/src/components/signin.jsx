import React, { useState } from "react"; // Destructured useState
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reenter, setreenter] = useState("");
  const [passerror, setpasserror] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    if (reenter === password) setpasserror(false);

    if (!passerror) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/users/signup",
          userData
        );
        setSuccessMessage("Signup successful! Redirecting to login...");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setErrorMessage("Error occurred while signing up.");
        setSuccessMessage("");
      }
    } else {
      alert("password doesnt match");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "300px" }}>
          <div className="card-body">
            <h5 className="card-title text-center pb-3">Signup</h5>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ boxShadow: "none" }}
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

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
                  placeholder="Enter the Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  style={{ boxShadow: "none" }}
                  placeholder="Re-Enter the Password"
                  value={reenter}
                  onChange={(e) => setreenter(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
