import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import axios from "axios";
import {au_api_headers} from "../../../services/au_api_headers";

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

    const op = "premium";
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

    const FeaturedAds = async () => {
        const res = await fetch(url, {
            method: 'GET',
            headers: au_api_headers,
        })
        const data = await res.json();
        console.log(data.result.data)
        setListingData(data.result.data)
    };

    useEffect(() => {
        FeaturedAds();

    }, []);

    const setAdReviewData = async ({postId}) => {
        const body = {
            "postId": {postId}
        };
        let url = new URL(
            `${process.env.REACT_APP_API_URL}plugins/posts/${postId}/reviews`
        );
        const res = await fetch(url, {
            method: 'GET',
            headers: au_api_headers,
            body: JSON.stringify(body),
        })
        const data = await res.json();
        //console.log(data);
        setReviewData(data)
    };

    const AdsCityData = async ({cityId}) => {

        const url = new URL(
            `${process.env.REACT_APP_API_URL}/cities/${cityId}`
        );

        const params = {
            "embed": "country",
        };
        Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));

        const res = await fetch(url, {
            method: 'GET',
            headers: au_api_headers,
        })
        const data = await res.json();
        //console.log(data.result)
        setCityData(data.result.name)
    };


    const slider = useRef();
    return (
        <section className="featured-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 aos aos-init aos-animate" data-aos="fade-up">
                        <div className="section-heading">
                            <h2>
                                Featu<span className="title-right magentaCircle">red</span> Ads
                            </h2>
                            <p>Checkout these latest coo ads from our members</p>
                        </div>
                    </div>
                    <div className="col-md-6 text-md-end aos" data-aos="fade-up">
                        <div className="owl-nav mynav2">
                            <button
                                type="button"
                                role="presentation"
                                className="owl-prev"
                                onClick={() => {
                                    console.log(slider?.current);
                                    slider?.current?.slickPrev()
                                }}

                            >
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <button
                                type="button"
                                role="presentation"
                                className="owl-next"
                                onClick={() => slider?.current?.slickNext()}
                            >
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <Slider ref={slider} {...settings} className=" featured-slider grid-view">

                                {listsdata.map(async (dataObj, index) => (


                                    <div className="card aos" data-aos="fade-up">
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
                                                            <img src={dataObj.user_photo_url} alt="author"/>
                                                        </div>
                                                        <div className="blog-features">
                                                            {dataObj.category_id}
                                                            <Link to="#">
                                                                <span>
                                                                  {" "}
                                                                    <i className="fa-regular fa-circle-stop"></i>{" "}
                                                                    Education
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <div className="blog-author text-end">
                                                              <span>
                                                                {" "}
                                                                  <i className="feather-eye"></i>{dataObj.visits}{" "}
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
                                                            {/*dataObj.city_id*/}
                                                            <i className="feather-map-pin"></i> {cityData(dataObj.id)}
                                                        </div>
                                                        <div className="location-info">
                                                            <i className="fa-regular fa-calendar-days"></i>{dataObj.created_at_formatted}
                                                        </div>
                                                    </div>
                                                    <div className="amount-details">
                                                        <div className="amount">
                                                            <span
                                                                className="validrate">{dataObj.price_formatted}</span>
                                                            <span>$450</span>
                                                        </div>
                                                        <div className="ratings">
                                                            <span>4.7</span> ({reviewData(dataObj.id).result.meta.total})
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
