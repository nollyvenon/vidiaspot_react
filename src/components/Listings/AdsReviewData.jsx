import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {au_api_headers} from "../../services/au_api_headers";
import {selectReviewById} from "../../features/slices/reviews/reviewSlice";

const AdsReviewData = ({match}) => {
    const {postId} = match.params
    const reviews = useSelector(state => state.reviews)
    const review = useSelector(state => selectReviewById(state, postId))
    /* const AdReviewData = async ({postId}) => {
         const body = {
             "postId": {postId}
         };
         let url = new URL(
             `${process.env.REACT_APP_API_URL}plugins/posts/${postId}/reviews`
         );
         /* const res = await fetch(url, {
              method: 'GET',
              headers: au_api_headers,
              body: JSON.stringify(body),
          })
          const data = await res.json();

         fetch(url, {
             method: "GET",
             headers: au_api_headers,
             body: JSON.stringify(body),
         }).then(async response => setReviewData(await response.json()));
         //console.log(data);
     };*/


    return (
        <div>
            <div className="ratings">
                <span>{dataObj.rating_ratio}/</span> ({dataObj.count}/>)
            </div>
        </div>
    );
};

export default AdsReviewData;
