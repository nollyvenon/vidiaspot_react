import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {au_api_headers} from "../../services/au_api_headers";

const Pagination = (pagination = null) => {
    const [listsdata, setListingData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    const [cityData, setCityData] = useState([]);

    return (
        <div>
            <div className="blog-pagination">
                <nav>
                    <ul className="pagination">
                        {pagination.limit * parseInt(pagination.current_page) < parseInt(pagination.total) ? (
                            <li className="page-item previtem">
                                <Link className="page-link" to={pagination.prev}>
                                    <i className="fas fa-regular fa-arrow-left"/> Prev
                                </Link>
                            </li>
                        ) : null}
                        <li className="justify-content-center pagination-center">
                            <div className="pagelink">
                                <ul>
                                    {parseInt(pagination.total) / parseInt(pagination.limit) > 1 ? (
                                        <li className="page-item">
                                            <Link className="page-link" to="#">
                                                {parseInt(pagination.current_page) - 1}
                                            </Link>
                                        </li>
                                    ) : null}
                                    <li className="page-item active">
                                        <Link className="page-link" to="#">
                                            {parseInt(pagination.current_page)} <span
                                            className="visually-hidden">(current)</span>
                                        </Link>
                                    </li>
                                    {parseInt(pagination.current_page) < parseInt(pagination.total) / parseInt(pagination.limit) ? (
                                        <li className="page-item">
                                            <Link className="page-link" to="#">
                                                {parseInt(pagination.current_page) + 1}
                                            </Link>
                                        </li>
                                    ) : null}
                                    {parseInt(pagination.current_page) + 5 < parseInt(pagination.total) / parseInt(pagination.limit) ? (
                                        <li className="page-item">
                                            <Link className="page-link"
                                                  to={`${pagination.path}?sort=${pagination.sort_method}&perPage=${parseInt(pagination.limit)}&distance=${pagination.distance}&page=${parseInt(pagination.current_page) + 5}`}>
                                                ...
                                            </Link>
                                        </li>
                                    ) : null}
                                    {pagination.current_page + 10 < pagination.total / pagination.limit ? (
                                        <li className="page-item">
                                            <Link className="page-link"
                                                  to={`${pagination.path}?sort=${pagination.sort_method}&perPage=${pagination.limit}&distance=${pagination.distance}&page=${parseInt(pagination.current_page) + 10}`}>
                                                {parseInt(pagination.current_page) + 10}
                                            </Link>
                                        </li>
                                    ) : null}
                                </ul>
                            </div>
                        </li>
                        {parseInt(pagination.limit) * parseInt(pagination.current_page) > parseInt(pagination.total) ? (
                            <li className="page-item nextlink">
                                <Link className="page-link" to={pagination.next}>
                                    Next <i className="fas fa-regular fa-arrow-right"/>
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </nav>

            </div>
        </div>

    );
};

export default Pagination;
