import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reset() {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, newPassword };

    try {
      const response = await axios.patch("http://localhost:8000/api/users/reset", userData);
      setSuccessMessage("Password reset successful! Redirecting to login...");
      setErrorMessage("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage("Error occurred while resetting the password.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: "300px" }}>
          <div className="card-body">
            <h5 className="card-title text-center pb-3">Reset your password</h5>

            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
