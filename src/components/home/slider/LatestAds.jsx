import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import axios from "axios";
import {au_api_headers} from "../../../services/au_api_headers";
import AdsCard from "../../Listings/AdsCard";

export default function FeaturedAds() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        lazyLoad: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    const [listsdata, setListingData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [cityData, setCityData] = useState([]);
    let url = new URL(
        `${process.env.REACT_APP_API_URL}posts`
    );

    const op = "latest";
    const postId = !postId ? '0' : postId;
    const distance = !distance ? 0 : distance;
    const belongLoggedUser = !belongLoggedUser ? '1' : belongLoggedUser;
    const pendingApproval = !pendingApproval ? 0 : pendingApproval;
    const archived = !archived ? '0' : archived;
    const embed = !embed ? "null" : embed;
    const sort = !sort ? 'created_at' : sort;
    const perPage = !perPage ? '20' : perPage;

    const params = {
        "op": op,     //  Type of listings list (optional) - Possible value: search,premium,latest,free,premiumFirst,similar. Example: null
        //   "postId": postId,      //Base Listing's ID to get similar listings (optional) - Mandatory to get similar listings (when op=similar).
        // "distance": distance,  //Distance to get similar listings (optional) - Also optional when the type of similar listings is based on the current listing's category. Mandatory when the type of similar listings is based on the current listing's location. So, its usage is limited to get similar listings (when op=similar) based on the current listing's location.
        //      "belongLoggedUser": belongLoggedUser,  //Do listings are belonged the logged user? Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
        //      "pendingApproval": pendingApproval,  //To list a user's listings in pending approval. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
        //      "archived": archived,  //To list a user's archived listings. Authentication token need to be sent in the header, and the "op" parameter need be null or unset - Possible value: 0 or 1.
        "embed": embed,   //Comma-separated list of the post relationships for Eager Loading - Possible values: user,category,parent,postType,city,savedByLoggedUser,pictures,latestPayment,package.
        "sort": sort,   //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: created_at.
        "perPage": perPage,   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
    };

    Object.keys(params)
        .forEach(key => url.searchParams.append(key, params[key]));

    const LatestAds = async () => {
        const res = await fetch(url, {
            method: 'GET',
            headers: au_api_headers,
        })
        const data = await res.json();
        //console.log(data.result.data)
        setListingData(data.result.data)
    };

    useEffect(() => {
        LatestAds();

    }, []);


    const slider = useRef();
    return (
        <section className="featured-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <Slider ref={slider} {...settings} className=" featured-slider grid-view">
                                <AdsCard listsdata={listsdata} location={location}
                                         distance={parseInt(params.distance)} aos="true"/>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
