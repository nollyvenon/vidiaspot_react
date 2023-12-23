import React, { useState } from "react";
import axios from 'axios';
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { Link } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../constants/apiConstants";
import Error from '../common/Error'

const Login = (props) => {
    const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
}

const togglePassword =()=>{
  if(passwordType==="password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}

const [state , setState] = useState({
    email : "",
    password : "",
    successMessage: null
})
const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
        "email":state.email,
        "password":state.password,
    }
    axios.post(API_BASE_URL+'auth/login', payload)
        .then(function (response) {
            if(response.status === 200){
                setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Login successful. Redirecting to home page..'
                }))
                localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                redirectToHome();
                props.showError(null)
            }
            else if(response.code === 204){
                props.showError("Username and password do not match");
            }
            else{
                props.showError("Username does not exists");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/dashboard');
}
const redirectToRegister = () => {
    props.history.push('/register'); 
    props.updateTitle('Register');
}
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
                                <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                                    {state.successMessage}
                                </div>
                                
                                <form>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-mail" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email Address"
                                                id="email" 
                                                aria-describedby="emailHelp" 
                                                value={state.email}
                                                onChange={handleChange}
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
                                                id="password" 
                                                value={state.password}
                                                onChange={handleChange} 
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
                                    <button className="btn btn-primary w-100 login-btn" type="submit" onClick={handleSubmitClick}>
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