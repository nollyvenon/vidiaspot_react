import {Link} from "react-router-dom";
import React, {useState} from "react";

const dashboardSidebar = () => {

    return (
        <div className="">
            <ul className="dashborad-menus">
                <li>
                    <Link to="/dashboard">
                        <i className="feather-grid" /> <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <i className="fa-solid fa-user" /> <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/my-listing">
                        <i className="feather-list" /> <span>My Listing</span>
                    </Link>
                </li>
                <li>
                    <Link to="/bookmarks">
                        <i className="fas fa-solid fa-heart" /> <span>Bookmarks</span>
                    </Link>
                </li>
                <li>
                    <Link to="/mesaages">
                        <i className="fa-solid fa-comment-dots" /> <span>Messages</span>
                    </Link>
                </li>
                <li>
                    <Link to="/reviews">
                        <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={logout}>
                        <i className="fas fa-light fa-circle-arrow-left" />{" "}
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default dashboardSidebar;
