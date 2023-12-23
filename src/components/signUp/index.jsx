import React from "react";
import Header from "../home/header";
import { Link } from "react-router-dom";
import { apple, facebook, google } from "../imagepath";
import Footer from "../home/footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {api_post_headers} from "../../services/api_post_headers";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { CookiesProvider, useCookies } from "react-cookie";

async function handleNavigator(pos) {
    const { latitude, longitude } = pos.coords;
  
    const userCountryCode = await lookupCountry({ latitude, longitude });
    setCountry(userCountryCode);
  }

const SignUp = () => {
    const [errors, setErrors] = React.useState([]);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [cookies, setCookie] = useCookies();
  
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
	const [tel, setTel] = useState("");
	const [password, setPassword] = useState("");
	const [confpassword, setConfPassword] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [ip_addr, setIP] = useState("");
    const [network, setNetwork] = useState("");
    const [timezone, setTimezone] = useState("");
    const [currency, setCurrency] = useState("");
    const [languages, setLanguage] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [phone, setPhone] = useState('');
	const navigate = useNavigate();


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

    const [formResponse, setFormResponse] = React.useState({
        fullname: "",email: "",
        password: "",
        confpassword: "",
        tel: "",
      });

    const postSignUpDetails = () => {
         //getGeoInfo = () => {
            axios.get('https://ipapi.co/json/').then((response) => {
                let data = response.data;
                setCountryName(data.country_name)
                setCountryCode(data.country_calling_code);
                setIP(data.ip);
                setNetwork(data.network);
                setTimezone(data.timezone);
                setCurrency(data.currency);
                setLanguage(data.languages);
                setPostalCode(data.postal);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
              // this.setState({
              //      countryName: data.country_name,
              //      countryCode: data.country_calling_code
              //  });
              console.log(data);
            });
        //};

        const url = new URL(
            `${process.env.REACT_APP_API_URL}users`
        );
        
        const { fullname, email, password, confpassword, tel, countryCode, countryName, ip_addr, languages, timezone } = formResponse;
        const headers = {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "Content-Language": "en",
            "X-AppApiToken": `${process.env.REACT_APP_API_TOKEN}`,
            "X-AppType": "docs",
        };
        
        const body = new FormData();
        body.append('name', fullname);
        body.append('country_code', countryCode);
        body.append('auth_field', 'email');
        if (countryCode !== undefined){
            body.append('phone', tel);
            body.append('phone_country', countryCode);
        }
        body.append('password', password);
        body.append('accept_terms', '1');
        body.append('email', email);
        body.append('language_code', languages);
        body.append('user_type_id', '1');
        body.append('gender_id', '1');
        body.append('phone_hidden', '');
        body.append('username', email);
        body.append('password_confirmation', confpassword);
        body.append('disable_comments', '1');
        body.append('create_from_ip', ip_addr);
        body.append('accept_marketing_offers', '');
        body.append('time_zone', timezone);
        body.append('captcha_key', 'praesentium');
        alert(countryCode);

        /*fetch(url, {
            method: "POST",
            headers,
            body,
        }).then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(body);
            if (data.message) {
                alert(data.message);
                setErrors(data.message);
            } else {
                alert("Account created successfully!");
                //navigate("/");
            }
        })
        .catch((err) => console.error(err));*/
        
        axios
          .post(`${process.env.REACT_APP_API_URL}users`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Content-Language": "en",
                "X-AppApiToken": `${process.env.REACT_APP_API_TOKEN}`,
                "X-AppType": "docs",
            }
          })
          .then(res => {
            
            setErrors(res.data.message);
            console.log("Res is:" +JSON.stringify(res.data.extra.authToken));

            localStorage.setItem('userToken', JSON.stringify(res.data.extra.authToken));
            localStorage.setItem('currentUser', JSON.stringify(res.data.extra.authToken));
            sessionStorage.setItem('token', JSON.stringify(res.data.extra.authToken));
    
            setCookie('currentUser', JSON.stringify(res.data.result), { path: "/" });
            setCookie('userToken', JSON.stringify(res.data.extra.authToken), { path: "/" });

            console.log(res)

            alert("Account created successfully!");
            setErrors("The account was created successfully.");
            navigate("/dashboard");
            
          })
          .catch(err => {
            //setErrors(err.message);
            setErrors("The account was not created successfully.");
            //alert(err.message);
            console.log(err);
          });
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		postSignUpDetails();
		setEmail("");
		setTel("");
		//setUsername("");
		//setPassword("");
	};
	const gotoLoginPage = () => navigate("/");

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
                                        Lets start with <span>Vidia</span>
                                    </p>
                                </div>
                                <div className="login-header">
                                    <h3>Welcome Back</h3>
                                    <p>Please Enter your Details</p>
                                    {errors.length > 0
                                    ?
                                        <p className=" alert-danger">{errors}</p>
                                    : null}
                                </div>
                                {/* Login Form */}
                                <form className='signup__form' onSubmit={handleSubmit}>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-user" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullname"
                                                id="fullname"
                                                required
                                                placeholder="Full Name"
                                                onChange={(e) =>
                                                    setFormResponse({
                                                      ...formResponse,
                                                      fullname: e.target.value,
                                                    })
                                                  }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                            <i className="feather-mail" />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='email'
                                                id='email'
                                                placeholder="Email Address"
                                                onChange={(e) => 
                                                    setFormResponse({
                                                        ...formResponse,
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group group-img">
                                        <div className="group-img">
                                         {/*   <i className="feather-phone" />
                                            <input
                                                className="form-control"
                                                required
                                                placeholder="Phone Number"
                                                type='tel'
                                                name='tel'
                                                id='tel'
                                                onChange={(e) => 
                                                    setFormResponse({
                                                        ...formResponse,
                                                        tel: e.target.value,
                                                    })
                                                }
                                            /> */}
                                            <PhoneInput
                                                className="form-control"
                                                defaultCountry="us"
                                                name='tel'
                                                id='tel'
                                                value={phone}
                                                onChange={(phone) => setPhone(phone)}
                                                onSubmit={(e) => 
                                                    setFormResponse({
                                                        ...formResponse,
                                                        tel: e.target.value,
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
                                                name='password'
                                                id='password'
                                                onMouseDown={handlePasswordChange}
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
                                    <div className="form-group">
                                        <div className="pass-group group-img">
                                            <i className="feather-lock" />
                                            <input
                                                 type={passwordType}
                                                className="form-control pass-input"
                                                name='confpassword'
                                                id='confpassword'
                                                placeholder="Password"
                                             //   onChange={handlePasswordChange}
                                                onChange={(e) => 
                                                    setFormResponse({
                                                        ...formResponse,
                                                        confpassword: e.target.value,
                                                    })
                                                }
                                            />
                                            <span className={`toggle-password  ${ passwordType==="password"? "feather-eye":"feather-eye-off" } `} onClick={togglePassword}></span>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-100 login-btn" type="submit">
                                        Create Account
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