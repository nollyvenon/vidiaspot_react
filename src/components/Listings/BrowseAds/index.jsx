import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getUserLocation} from '../../../features/slices/currentLocationSlice';
import {getAllListings} from '../../../features/slices/listingSlice';
import Sidebar from "./sidebar";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import {Link, useLocation} from "react-router-dom";
import AdsCard from "../AdsCard";
import {au_api_headers} from "../../../services/au_api_headers";
import Pagination from "../Pagination";

const BrowseAds = (currentPage = null) => {
    const parms = useLocation().pathname
    let [listingsdata, setListingData] = useState([]);
    const dispatch = useDispatch();
    const curLocation = useSelector((state) => state.userlocation.entities);
    const params = {
        "op": "premiumFirst",     //  Type of listings list (optional) - Possible value: search,premium,latest,free,premiumFirst,similar. Example: null
        "distance": "50",  //Distance to get similar listings (optional) - Also optional when the type of similar listings is based on the current listing's category. Mandatory when the type of similar listings is based on the current listing's location. So, its usage is limited to get similar listings (when op=similar) based on the current listing's location.
        "embed": "city,savedByLoggedUser,pictures,latestPayment,package",   //Comma-separated list of the post relationships for Eager Loading - Possible values: user,category,parent,postType,city,savedByLoggedUser,pictures,latestPayment,package.
        "sort": "created_at",   //The sorting parameter (Order by DESC with the given column. Use "-" as prefix to order by ASC). Possible values: created_at.
        "perPage": "20",   //Items per page. Can be defined globally from the admin settings. Cannot be exceeded 100.
    };

    //const browseposts = useSelector(state => selectAllListings(state, params));
    const browseposts = useSelector((state) => state.listings)
    //console.log(browseposts.entities)
    setListingData(browseposts.entities.result);
    //const isLoading = useSelector((state) => state.userlocation.loading)
    //const error = useSelector((state) => state.userlocation.error)
    const location = useLocation()
    const {rowVisibility} = location.state ? location.state : ""

    const [pagination, setMetaData] = useState({total: 0, limit: ""});
    /*
        setMetaData({
            ...pagination,
            limit: data.result.meta.per_page,
            from: data.result.meta.from,
            current_page: data.result.meta.current_page,
            last_page: data.result.meta.last_page,
            total: data.result.meta.total,
            path: data.result.meta.path,
            first: data.result.links.first,
            last: data.result.links.last,
            prev: data.result.links.prev,
            next: data.result.links.next,
            sort_method: params.sort,
            embed: params.embed,
            op: params.op,
            distance: params.distance,
       */

    useEffect(() => {
        dispatch(getUserLocation());

        dispatch(getAllListings({
            op: 'premiumFirst',
            postId: null,
            distance: 50,
            belongLoggedUser: 1,
            pendingApproval: 0,
            archived: 0,
            embed: 'user,category,parent,postType,city',
            sort: 'created_at',
            perPage: 20
        })).unwrap();
    }, []);

    //console.log(pagination)
    return (
        <>
            <Header parms={parms}/>
            {/* Breadscrumb Section */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <div className="row align-items-center text-center">
                        <div className="col-md-12 col-12">
                            <h2 className="breadcrumb-title">Browse Ads</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Browse Ads
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Breadscrumb Section */}
            {/* Main Content Section */}
            <div className="list-content">
                <div className="container">
                    <div className="row">
                        <Sidebar/>

                        <div className="col-lg-8">

                            <div className="row sorting-div">

                                <div className="col-lg-4 col-md-4 col-sm-4 align-items-center d-flex">

                                    <div className="count-search">
                                        <p>
                                            Showing <span>1-8</span> of {pagination.total} Results
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-8 col-md-8 col-sm-8  align-items-center">
                                    <div className="sortbyset">
                                        <span className="sortbytitle">Sort by</span>
                                        <div className="sorting-select">
                                            <select name="orderType" className="form-control select">
                                                <option>Default</option>
                                                <option>Price Low to High</option>
                                                <option>Price High to Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid-listview">
                                        <ul>
                                            <li>
                                                <Link to="/browse_ad" state={{rowVisibility: "list"}}>
                                                    <i className="feather-list"/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/browse_ad" className="active"
                                                      state={{rowVisibility: "grid"}}>
                                                    <i className="feather-grid"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-view listgrid-sidebar">
                                <div className="row">
                                    <AdsCard listsdata={listingsdata} location={location}
                                             distance={parseInt(params.distance)} rowVisibility={rowVisibility}/>

                                    <Pagination pagination={pagination} total={pagination.total}
                                                currentPage={pagination.current_page}/>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {/* /Main Content Section */}

            <Footer/>
        </>

    );
}
export default BrowseAds;