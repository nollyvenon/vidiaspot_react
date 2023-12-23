import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/home";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
// import "./assets/css/bootstrap.min.css.map";
import "./assets/css/feather.css";
// import "./assets/css/owl.carousel.min.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";

import Listing_Grid from "./components/Listings/ListingGrid";
import ServiceDetails from "./components/Listings/serviceDetails/serviceDetails";
import ListingMap from "./components/Listings/listingMap";
import GridSidebar from "./components/Listings/BrowseAds";
import ListSidebar from "./components/Listings/LisitingListSidebar";
import GridMap from "./components/Listings/GridMap";
import About from "./components/pages/about";
import Pricing from "./components/pages/about/pricing";
import Faq from "./components/pages/faq";
import Gallary from "./components/pages/gallary";
import Category from "./components/pages/category";
import HowItWork from "./components/pages/howitWork";
import TermsCondition from "./components/pages/termsCondition";
import PrivacyPolicy from "./components/pages/privacyPolicy";
import Error404 from "./components/pages/404error";
import Error504 from "./components/pages/504error";
import Dashboard from "./components/userPages/Dashboard";
import Profile from "./components/userPages/profile";
import Bookmarks from "./components/userPages/bookmark";
import MyListe from "./components/userPages/mylisting";
import Message from "./components/userPages/mesage";
import Review from "./components/userPages/review";
import AddLisiting from "./components/userPages/AddLisiting";
import BlogList from "./components/blog/BlogList";
import BlogDetailsh from "./components/blog/BlogList/blogDatalish";
import BlogGrid from "./components/blog/BlogList/BlogGrid";
import BlogListSideBar from "./components/blog/BlogList/blogListSidebar";
import BlogGridSidebar from "./components/blog/BlogList/blogGridSidebar";
import Contract from "./components/contract";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import config from 'config';

export const App = () => {
    return (
        <BrowserRouter basename={`${config.publicPath}`}>
            <Routes>
                {/* Home Routes */}
                <Route path="/index" element={<Home/>}/>
                <Route path="/listing-grid" element={<Listing_Grid/>}/>
                <Route path="/service-details" element={<ServiceDetails/>}/>
                <Route path="/listingmap-list" element={<ListingMap/>}/>
                <Route path="/browse_ad" element={<GridSidebar/>}/>
                <Route path="/listing-list-sidebar" element={<ListSidebar/>}/>
                <Route path="/listingmap-grid" element={<GridMap/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/faq" element={<Faq/>}/>
                <Route path="/gallery" element={<Gallary/>}/>
                <Route path="/categories" element={<Category/>}/>
                <Route path="/howitworks" element={<HowItWork/>}/>
                <Route path="/terms-condition" element={<TermsCondition/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                <Route path="/error-404" element={<Error404/>}/>
                <Route path="/error-500" element={<Error504/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/bookmarks" element={<Bookmarks/>}/>
                <Route path="/my-listing" element={<MyListe/>}/>
                <Route path="/messages" element={<Message/>}/>
                <Route path="/reviews" element={<Review/>}/>
                <Route path="/postad" element={<AddLisiting/>}/>
                <Route path="/blog-list" element={<BlogList/>}/>
                <Route path="/blog-details" element={<BlogDetailsh/>}/>
                <Route path="/blog-grid" element={<BlogGrid/>}/>
                <Route path="/blog-list-sidebar" element={<BlogListSideBar/>}/>
                <Route path="/blog-grid-sidebar" element={<BlogGridSidebar/>}/>
                <Route path="/contact" element={<Contract/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
};
