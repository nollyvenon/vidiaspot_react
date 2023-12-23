import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {au_api_headers} from "../../../services/au_api_headers";

export default function Sponsors() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        lazyLoad: true,
        speed: 3000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        // draggable: true,
        swipe: true,
        swipeToSlide: true,
    };
    const [sponsordata, setSponsorData] = useState([]);
    const SponsorsInfo = async () => {
        const url = new URL(
            `${process.env.REACT_APP_API_URL}sponsors`
        );
        const res = await fetch(url, {
            method: 'GET',
            headers: au_api_headers,
        })
        const data = await res.json();
        console.log(data.result.data)
        setSponsorData(data.result.data)
    };

    useEffect(() => {
        SponsorsInfo();

    }, []);
    return (
        <ul className=" partnerslist">
            <Slider {...settings}>
                {sponsordata.map(async (dataObj, index) => (
                    <li>
                        <Link to="#">
                            <img className="img-fluid" src={dataObj.SponsorImg} alt="partners"/>
                        </Link>
                    </li>
                ))
                }

            </Slider>
        </ul>
    );
}
