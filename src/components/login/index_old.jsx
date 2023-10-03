import React, { useState, useEffect } from "react";
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
import { toast } from "react-toastify";
import saveToken from '../../services/useToken';
import axios from "axios";
import PropTypes from "prop-types";
import 'regenerator-runtime/runtime';

const Login = ({ setToken }) => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = React.useState([]);

    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
         setPassword(evnt.target.value);
    }

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }

    const loginUser = async (credentials) => {
        console.log('email is'+ email);
        return fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Content-Language' : 'en',
                'X-AppApiToken' : process.env.REACT_APP_API_TOKEN,
                'X-AppType' : 'docs',
            },
            body: JSON.stringify(credentials)
        })
            .then((res) => {
                console.log('email is'+ email);
                res.json(),
                console.log("Res is" +res.status);
            if (res.status == true || res.status == '200'){
              //  localStorage.setItem('userToken', res.data.userData.userToken);
              //  localStorage.setItem('currentUser', JSON.stringify(res.data));
                this.props.history.push('/dashboard')
            }else{
                switch(res.data.status) {
                    case true:
                    // this.props.history.push('/dashboard')
                    case 404:
                        const notify = () => toast("A user with this account does not exist.", { type: "error", position: "top-right" });
                        return notify();
                    case 401:
                        const notify1 = () => toast("The password is not correct.", { type: "error", position: "top-right" });
                        return notify1();
                    default:
                        const notify2 = () => toast("Try again", { type: "error", position: "top-right" });
                        notify2();
                }
            }
        }).catch((err) => {

                setErrors([err.res.data.message]);
                console.log("Error is"+err);
                setErrors([
                    "An error occured, make sure you have a working network",
                ]);
        });
    };
    const handleLogin = async e => {
        e.preventDefault()
        const token = await loginUser({
            "email": email,
            "password": password,
            "auth_field": "email",
        });
        setToken(token);
    };

    return (
        <>
            <Header />
            {/* Breadscrumb Section */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-md-12 col-12">
                            <h2 className="breadcrumb-title">Login</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Login
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Breadscrumb Section */}
            {/* Login Section */}
            <div className="login-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 mx-auto">
                            <div className="login-wrap">
                                <div className="login-header">
                                    <h3>Welcome Back</h3>
                                    <p>Please Enter your Details</p>
                                </div>
                                {/* Login Form */}
                                <div className="row justify-content-center">
                                    <div className="col-lg-7 text-left">
                                        {errors.length > 0
                                            ? errors.map((xxx) => (
                                                <p className="error-card alert-danger">{xxx}</p>
                                            ))
                                            : null}
                                        <div style={{ height: "10px" }} />
                                    </div>
                                </div>
                                <form  onSubmit={handleLogin}>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-mail" />
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address"
                                                 onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="pass-group group-img">
                                            <i className="feather-lock" />
                                            <input
                                                type={passwordType}
                                                className="form-control pass-input"
                                                placeholder="Password"
                                                onChange={handlePasswordChange}
                                                value={passwordInput}
                                            />
                                            <span className={`toggle-password  ${ passwordType==="password"? "feather-eye":"feather-eye-off" } `} onClick={togglePassword}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <label className="custom_check">
                                                <input
                                                    type="checkbox"
                                                    name="rememberme"
                                                    className="rememberme"
                                                />
                                                <span className="checkmark" />
                                                Remember Me
                                            </label>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="text-md-end">
                                                <Link className="forgot-link" to="/forgot-password">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-100 login-btn" type="submit">
                                        Sign in
                                    </button>
                                    <div className="register-link text-center">
                                        <p>
                                            No account yet?{" "}
                                            <Link className="forgot-link" to="/signup">
                                                Signup
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="login-or">
                                        <span className="or-line" />
                                        <span className="span-or">
                                            Sign in with Social Media Accounts
                                        </span>
                                    </div>
                                    <div className="social-login">
                                        <Link to="#" className="btn btn-apple w-100">
                                            <img src={apple} className="me-1" alt="img" />
                                            Sign in with Apple
                                        </Link>
                                    </div>
                                    <div className="social-login">
                                        <Link to="#" className="btn btn-google w-100">
                                            <img src={google} className="me-1" alt="img" />
                                            Sign in with Google
                                        </Link>
                                    </div>
                                    <div className="social-login">
                                        <Link to="#" className="btn btn-facebook w-100 mb-0">
                                            <img
                                                src={facebook}
                                                className="me-2"
                                                alt="img"
                                            />
                                            Continue with Facebook
                                        </Link>
                                    </div>
                                </form>
                                {/* /Login Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Login Section */}

            <Footer />
        </>

    );
}
export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};