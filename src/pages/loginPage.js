import React, { useState } from "react";
import { Alert, Button, Container, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { API_KEY } from "../ultils/constant";
import axios from "axios";
import { login, logout } from "../redux/userSlice";
import HomePage from "./homePage";
import styles from "../css/Login.module.css";
import "bootstrap/dist/css/bootstrap.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const token = useSelector((state) => state.userReducer.token);
  const submit = async () => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      dispatch(login(res.data.idToken));
      navigate("/");
      console.log("token", token);
    } catch (error) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };
  return (
    <Container>
      {token !== null ? (
        navigate("/")
      ) : (
        <div>
          <section className="vh-100">
            <div
              className="container-fluid h-custom"
              style={{ marginTop: "100px" }}
            >
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  {/* <img
                    src="https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png"
                    className="img-fluid"
                    alt="Sample image"
                  /> */}
                  <img
                    src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
                    style={{ width: "350px" }}
                  />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form>
                    {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                      <h2>LIBRARY MANAGEMENT</h2>
                    </div> */}

                    <div className="divider d-flex align-items-center my-4">
                      <h3>Đăng nhập</h3>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example3">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label" for="form3Example4">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        style={{
                          paddingLeft: "2.5rem",
                          paddingRight: "2.5rem",
                        }}
                        onClick={() => submit()}
                      >
                        Login
                      </button>
                      {error ? (
                        <Alert variant="danger" style={{ marginTop: "20px" }}>
                          {error}
                        </Alert>
                      ) : null}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </Container>
  );
}
