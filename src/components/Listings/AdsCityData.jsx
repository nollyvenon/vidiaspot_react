import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {au_api_headers} from "../../services/au_api_headers";
import {listReviews} from "../../features/slices/reviews/singleReviewSlice";
import * as PropTypes from "prop-types";

const AdsCard = ({cityId}) => {
    const [reviewData, setReviewData] = useState([]);
    const [cityData, setCityData] = useState([]);


    const contents = useSelector((state) => state.listreview_data.contents)
    const isLoading = useSelector((state) => state.listreview_data.isLoading)
    const error = useSelector((state) => state.listreview_data.error)

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


    return (
        <div>
            <div className="ratings">
                <span>{dataObj.rating_ratio}/</span> ({dataObj.count}/>)
            </div>
        </div>
    );
};

export default AdsCard;
