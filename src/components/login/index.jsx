import React, { useState,  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from "../home/header";
import Footer from "../home/footer/Footer";
import { apple, facebook, google } from "../imagepath";
import { setToken } from '../../useToken';
import { toast } from "react-toastify";
import { CookiesProvider, useCookies } from "react-cookie";
import {useNavigate, withRouter, Link } from "react-router-dom";
import {api_post_headers} from "../../services/api_post_headers";

const Login = ({ setToken }) => {
    const [passwordType, setPasswordType] = useState("password");
 // const [passwordInput, setPasswordInput] = useState("");
 const [errors, setErrors] = React.useState([]);
 //const {token, setToken} = useToken() 
 const [state, setState] = useState({
    email: null,
    password: null,
    rememberMe: false,
  });
    let navigate  = useNavigate();
        //const dispatch = useDispatch();
        const [cookies, setCookie] = useCookies();

    const togglePassword =()=>{
    if(passwordType==="password")
    {
    setPasswordType("text")
    return;
    }
    setPasswordType("password")
    }

    const [formResponse, setFormResponse] = React.useState({
        email: "",
        password: "",
      });
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault()
        postLoginDetails();        

        
    }

    const postLoginDetails = () => {
        const { email, password } = formResponse;
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Content-Language": "en",
            "X-AppApiToken": `${process.env.REACT_APP_API_TOKEN}`,
            "X-AppType": "docs",
        };
        
        let body = {
            "email": email,
            "password": password,
            "auth_field": "email",
            "phone": "null",
            "phone_country": "null",
            "captcha_key": "eaque"
        };

        fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        }).then(response => response.json())
        //  .then(data => data.json())
        .then((res) => {
            
            if (res.success === false){
                console.log("Res is" +res.message)
                setErrors(res.message);
                const notify = () => toast(res.message, { type: "error", position: "top-right" });
                return notify();
                    
            }else{
                console.log("Res is:" +JSON.stringify(res.extra.authToken));
                setToken(res.extra.authToken);

                localStorage.setItem('userToken', JSON.stringify(res.result));
                localStorage.setItem('currentUser', JSON.stringify(res.extra.authToken));
                sessionStorage.setItem('token', JSON.stringify(res.extra.authToken));
        
                setCookie('currentUser', JSON.stringify(res.result), { path: "/" });
                setCookie('userToken', JSON.stringify(res.extra.authToken), { path: "/" });
                //dispatch(loginUser(res.data.userData));
                // console.log("userdata is"+res.data.userData)
                navigate("/dashboard"); 
                
                const notify = () => toast(res.message, { type: "error", position: "top-right" });
                return notify();
            
            }
        }).catch((err) => console.error(err));
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
                                    {errors.length > 0
                                    ?
                                        <p className=" alert-danger">{errors}</p>
                                    : null}
                                </div>
                                {/* Login Form */}
                                
                                <form  onSubmit={handleSubmit}>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-mail" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email Address"
                                                id="email" 
                                                name="email"
                                                aria-describedby="emailHelp" 
                                                value={formResponse.email}
                                                required
                                                onChange={(e) =>
                                                    setFormResponse({
                                                      ...formResponse,
                                                      email: e.target.value,
                                                    })
                                                  }
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
                                                name="password"
                                                value={formResponse.password}
                                                required
                                                onChange={(e) =>
                                                setFormResponse({
                                                    ...formResponse,
                                                    password: e.target.value,
                                                })
                                                }
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