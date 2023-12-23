import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.entities.find(u => u.id === userId));
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);
  
    React.useEffect(() => {
      if (userId) {
        dispatch(fetchUserData(userId));
      }
    }, [userId, dispatch]);
  
    if (loading === 'pending') return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className="">
            <ul className="dashborad-menus">
                <li>
                    <Link to="/dashboard">
                        <i className="feather-grid" /> <span>Dashboard</span>
                    </Link>
                </li>
                <li className="active">
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
                    <Link to="/messages">
                        <i className="fa-solid fa-comment-dots" /> <span>Messages</span>
                    </Link>
                </li>
                <li>
                    <Link to="/reviews">
                        <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <i className="fas fa-light fa-circle-arrow-left" />{" "}
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
export default DashboardMenu;    