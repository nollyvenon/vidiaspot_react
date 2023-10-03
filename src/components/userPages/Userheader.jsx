import React, {useEffect, useState} from "react";
import HomeMenu from "../common/HomeMenu";
import ListingMenu from "../common/ListingMenu";
import PagesMenu from "../common/PagesMenu";
import UserPagesMenu from "../common/UserPagesMenu";
import BlogMenu from "../common/BlogMenu";
import { LogoSvg, profile_img } from "../imagepath";
import { Link } from "react-router-dom";
import {logout, setCredentials} from "../../features/auth/authSlice";
import {useGetUserDetailsQuery} from "../../services/auth/authService";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "antd";

const UserHeader = ({parms}) => {
    const [drops,setDrops]=useState(false);
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
    })

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch])

    return (
        <>
            {/* Header */}
            <header className="header">
                <div className="container">
                    {userInfo ? (
                        <button className='button' onClick={() => dispatch(logout())}>
                            Logout
                        </button>
                    ) : (
                    <nav className="navbar navbar-expand-lg header-nav">
                        <span>
                          {isFetching
                              ? `Fetching your profile...`
                              : userInfo !== null
                                  ? `Logged in as ${userInfo.email}`
                                  : "You're not logged in"}
                        </span>
                        <div className="navbar-header">
                            <Link id="mobile_btn" to="#">
                                <span className="bar-icon">
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </Link>
                            <Link to="/index" className="navbar-brand logo">
                                <img src={LogoSvg} className="img-fluid" alt="Logo" />
                            </Link>
                        </div>
                        <div className="main-menu-wrapper">
                            <div className="menu-header">
                                <Link to="/index" className="menu-logo">
                                    <img src={LogoSvg} className="img-fluid" alt="Logo" />
                                </Link>
                                <Link
                                    id="menu_close"
                                    className="menu-close"
                                    to="#"
                                >
                                    {" "}
                                    <i className="fas fa-times" />
                                </Link>
                            </div>
                            <ul className="main-nav">
                                <HomeMenu activeMenu={"Classified"} />
                                <ListingMenu />
                                <PagesMenu />
                                <UserPagesMenu activesMenu={parms}/>
                                <BlogMenu />
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li className="login-link">
                                    <Link to="/signup">Sign Up</Link>
                                </li>
                                <li className="login-link">
                                    <Link to="login">Sign In</Link>
                                </li>
                            </ul>
                        </div>
                        <ul className="nav header-navbar-rht">
                            <li className="nav-item">
                                <Link
                                    className="nav-link header-login add-listing"
                                    to="/add-listing"
                                >
                                    <i className="fa-solid fa-plus" /> Add Listing
                                </Link>
                            </li>
                            <li className="nav-item dropdown has-arrow logged-item">
                                <Link
                                    to="#"
                                    className={`${drops===true ?"dropdown-toggle profile-userlink show " :"dropdown-toggle profile-userlink"}`}
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={()=>setDrops(!drops)}
                                    // className={`${change1===true ? 'dropdown-menu dropdown-menu-end show' : "dropdown-menu dropdown-menu-end"}`}
                                >
                                    <img src={profile_img} alt="" />
                                    <span>John Doe</span>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <Link className="dropdown-item" to="/dashboard">
                                        Dashboard
                                    </Link>
                                    <Link className="dropdown-item" to="/profile">
                                        Profile Settings
                                    </Link>
                                    <Link className="dropdown-item" onClick={logout}>
                                        Logout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    )}
                </div>
            </header>
            {/* /Header */}
        </>

    );
}
export default UserHeader;