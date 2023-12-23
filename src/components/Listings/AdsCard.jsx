import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {au_api_headers} from "../../services/au_api_headers";
import AdsReviewData from "./AdsReviewData";

const AdsCard = ({
                     listingsdata,
                     op = "latest",
                     embed = null,
                     distance = 0,
                     sort = "created_at",
                     perPage = "20",
                     showPagination = 0,
                     rowVisibility = null,
                     aos = null
                 }) => {

    const VisibStart = ({rowVisibility = null}) => {
        switch (rowVisibility) {
            case "grid":
                return "<div className='col-lg-6 col-md-4'>";
                break;
            case "list":
                return "<div className=\"blog-listview\">"
                break;
            default:
                return ""
                break;
        }

    };
    const VisibEnd = ({rowVisibility = null}) => {
        if (rowVisibility === "grid") {
            return "</div>";
        }
    };

    const FrontPageCards = ({aos = null}) => {
        if (aos === "true") {
            return "<div className=\"card aos\" data-aos=\"fade-up\">";
        } else {
            return "<div className=\"card\">";
        }
    };

    const FrontPageCardsEnd = ({rowVisibility = null}) => {
        if (rowVisibility === "grid") {
            return "</div>";
        }
    };

    return (
        <div>
            {listingsdata.map(async (dataObj, index) => (
                <> <VisibStart/>
                    <FrontPageCards/>
                    <div className="blog-widget">
                        <div className="blog-img">
                            <Link to={dataObj.url}>
                                <img
                                    src={dataObj.picture.url.full}
                                    className="img-fluid"
                                    alt="blog-img"
                                />
                            </Link>
                            {dataObj.featured === 1 ? (
                                <div className="fav-item">
                                    <span className="Featured-text">Featured</span>
                                    <Link to="#" className="fav-icon">
                                        <i className="feather-heart"/>
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                        <div className="bloglist-content">
                            <div className="card-body">
                                <div className="blogfeaturelink">
                                    <div className="grid-author">
                                        <img
                                            src={dataObj.user_photo_url}
                                            alt="author"
                                        />
                                    </div>
                                    <div className="blog-features">
                                        {dataObj.category_id}
                                        <Link to="#">
                                                                                <span>
                                                                                    {" "}
                                                                                    <i className="fa-regular fa-circle-stop"/>{" "}
                                                                                    Vehicle
                                                                                </span>
                                        </Link>
                                    </div>
                                    <div className="blog-author text-end">
                                                                            <span>
                                                                                {" "}
                                                                                <i className="feather-eye"/>
                                                                                {dataObj.visits}
                                                                            </span>
                                    </div>
                                </div>
                                <h6>
                                    <Link to={dataObj.url}>
                                        {dataObj.title}
                                    </Link>
                                </h6>
                                <div className="blog-location-details">
                                    <div className="location-info">
                                        <i className="feather-map-pin"/>
                                        <cityData cityId={dataObj.id}/>
                                    </div>
                                    <div className="location-info">
                                        <i className="fa-solid fa-calendar-days"/> {dataObj.created_at_formatted}
                                    </div>
                                </div>
                                <div className="amount-details">
                                    <div className="amount">
                                                                            <span
                                                                                className="validrate">{dataObj.price_formatted}</span>
                                        <span>$450</span>
                                    </div>
                                    <AdsReviewData postId={dataObj.id}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FrontPageCardsEnd/>
                    <VisibEnd/>
                </>
            ))
            }
        </div>
    );
};

export default AdsCard;
