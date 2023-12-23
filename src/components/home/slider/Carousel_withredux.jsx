import React, {useEffect, useRef, useState} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    Feature2,
    Feature3,
    Feature4,
    Feature5,
    Feature9,
    ProfileAvatar02,
    ProfileAvatar04,
    ProfileAvatar05,
    ProfileAvatar06,
} from "../../imagepath";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {
    selectAllListings,
    listingsStatus,
    getListingsError,
    getAllListings,
} from '../../../features/slices/listingSlice';

export default function Carousel() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        lazyLoad: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const dispatch = useDispatch();
    const listsdata = useSelector(selectAllListings);
    const listingStatus = useSelector(listingsStatus);
    const error = useSelector(getListingsError);

    useEffect(() => {
        if (listingStatus === 'idle') {
            dispatch(getAllListings({}));
        }
    }, [listingStatus, dispatch]);
    let contentToDisplay = '';
    if (listingStatus === 'loading') {
        contentToDisplay = <h2>Loading...</h2>;
    } else if (listingStatus === 'succeeded') {

        contentToDisplay = listsdata.map((data, id) => (
            <div className="card aos" data-aos="fade-up">
                <div className="blog-widget">
                    <div className="blog-img">
                        <Link to="/service-details">
                            <img
                                src={Feature9}
                                className="img-fluid"
                                alt="blog-img"
                            />
                        </Link>
                        <div className="fav-item">
                            <span className="Featured-text">Featured</span>
                            <Link to="#" className="fav-icon">
                                <i className="feather-heart"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="bloglist-content">
                        <div className="card-body">
                            <div className="blogfeaturelink">
                                <div className="grid-author">
                                    <img src={ProfileAvatar02} alt="author"/>
                                </div>
                                <div className="blog-features">
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
                      <i className="feather-eye"></i>4000{" "}
                  </span>
                                </div>
                            </div>
                            <h6>
                                <Link to="/service-details">
                                    2017 Gulfsteam Ameri-lite
                                </Link>
                            </h6>
                            <div className="blog-location-details">
                                <div className="location-info">
                                    <i className="feather-map-pin"></i> Los Angeles
                                </div>
                                <div className="location-info">
                                    <i className="fa-regular fa-calendar-days"></i> 06
                                    Oct, 2022
                                </div>
                            </div>
                            <div className="amount-details">
                                <div className="amount">
                                    <span className="validrate">$350</span>
                                    <span>$450</span>
                                </div>
                                <div className="ratings">
                                    <span>4.7</span> (50)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>));
    } else if (listingStatus === 'failed') {
        contentToDisplay = <p>{error}</p>;
    }


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
                                {contentToDisplay}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
