import React, { useState, useEffect } from "react";
import Header from "../home/header";
import { Link } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
import Footer from "../home/footer/Footer";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../common/Error';
import Spinner from '../common/Spinner';
import { registerUser } from '../../features/auth/authActions';
const SignUp = () => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange =(evnt)=> {
        setPasswordInput(evnt.target.value);
    }

    const [customError, setCustomError] = useState(null)
    const { loading, userInfo, error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userInfo) navigate('/userPages/Dashboard')
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            setCustomError('Password mismatch')
            return
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase()

        dispatch(registerUser(data))
    }

    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
    return (
        <>
            <Header />
            {/* Breadscrumb Section */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-md-12 col-12">
                            <h2 className="breadcrumb-title">Create an Account</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Register
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
                            <div className="login-wrap register-form">
                                <div className="login-header">
                                    <h3>Create an Account</h3>
                                    <p>
                                        Lets start with <span>VidiaSpot</span>
                                    </p>
                                </div>
                                {/* Login Form */}
                                <form  onSubmit={handleSubmit(submitForm)}>
                                    {error && <Error>{error}</Error>}
                                    {customError && <Error>{customError}</Error>}
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-user" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full Name"
                                                {...register('name')}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-mail" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email Address"
                                                {...register('email')}
                                                 required
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
                                                 {...register('password')}
                                                 required
                                            />
                                            <span className={`toggle-password  ${ passwordType==="password"? "feather-eye":"feather-eye-off" } `} onClick={togglePassword}></span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 login-btn">
                                        {loading ? <Spinner /> : 'Create Account'}
                                    </button>
                                    <div className="register-link text-center">
                                        <p>
                                            Already have an account?{" "}
                                            <Link className="forgot-link" to="/login">
                                                Sign In
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
export default SignUp;