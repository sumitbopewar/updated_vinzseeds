import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import './shop.css';
import axios from 'axios';

function Shop() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [colors, setColors] = useState([]);
    const [sortOption, setSortOption] = useState('Latest');
    const [showCount, setShowCount] = useState(10);

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then((res) => {
                setData(res.data);
                setFilteredData(res.data);
                setPriceRanges(extractPriceRanges(res.data));
                setColors(extractColors(res.data));
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        let sortedData = [...data];
        switch (sortOption) {
            case 'Latest':
                sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Popularity':
                sortedData.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'Best Rating':
                sortedData.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        setFilteredData(sortedData.slice(0, showCount));
    }, [sortOption, showCount, data]);

    const extractPriceRanges = (data) => {
        const prices = data.map(item => item.price);
        return [
            { label: "All Price", range: [0, Math.max(...prices)] },
            { label: "₹0 - ₹100", range: [0, 100] },
            { label: "₹100 - ₹200", range: [100, 200] },
            { label: "₹200 - ₹300", range: [200, 300] },
            { label: "₹300 - ₹400", range: [300, 400] },
            { label: "₹400 - ₹500", range: [400, 500] }
        ];
    };

    const extractColors = (data) => {
        const colors = new Set(data.map(item => item.color));
        return ["All Color", ...colors];
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<small key={i} className="fa fa-star text-primary mr-1"></small>);
            } else if (i - rating === 0.5) {
                stars.push(<small key={i} className="fa fa-star-half-alt text-primary mr-1"></small>);
            } else {
                stars.push(<small key={i} className="fa fa-star text-secondary mr-1"></small>);
            }
        }
        return stars;
    };

    return (
        <div>
            <Header />
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Shop List</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* <!-- Shop Start --> */}
            <div className="container-fluid" style={{ marginTop: "20vh" }}>
                <div className="row px-xl-5" style={{ position: "relative", overflow: "auto", height: "90vh" }}>
                    {/* <!-- Shop Sidebar Start --> */}
                    <div className="col-lg-3 col-md-4" style={{ height: "100%", overflow: "hidden", position: "absolute", top: "0", left: "0" }}>
                        {/* <!-- Price Start --> */}
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {priceRanges.map((range, index) => (
                                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                        <input type="checkbox" className="custom-control-input" id={`price-${index}`} />
                                        <label className="custom-control-label" htmlFor={`price-${index}`}>{range.label}</label>
                                        <span className="badge border font-weight-normal">{data.filter(item => item.price >= range.range[0] && item.price <= range.range[1]).length}</span>
                                    </div>
                                ))}
                            </form>
                        </div>
                        {/* <!-- Price End --> */}

                        {/* <!-- Color Start --> */}
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by color</span></h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {colors.map((color, index) => (
                                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={index}>
                                        <input type="checkbox" className="custom-control-input" id={`color-${index}`} />
                                        <label className="custom-control-label" htmlFor={`color-${index}`}>{color}</label>
                                        <span className="badge border font-weight-normal">{color === "All Color" ? data.length : data.filter(item => item.color === color).length}</span>
                                    </div>
                                ))}
                            </form>
                        </div>
                        {/* <!-- Color End --> */}
                    </div>
                    {/* <!-- Shop Sidebar End --> */}

                    {/* <!-- Shop Product Start --> */}
                    <div className="col-lg-9 col-md-8" style={{ height: "100%", overflow: "auto", position: "absolute", top: "0", right: "0" }}>
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div>
                                        <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                                        <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button>
                                    </div>
                                    <div className="ml-2">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => setSortOption('Latest')}>Latest</button>
                                                <button className="dropdown-item" onClick={() => setSortOption('Popularity')}>Popularity</button>
                                                <button className="dropdown-item" onClick={() => setSortOption('Best Rating')}>Best Rating</button>
                                            </div>
                                        </div>
                                        <div className="btn-group ml-2">
                                            <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <button className="dropdown-item" onClick={() => setShowCount(10)}>10</button>
                                                <button className="dropdown-item" onClick={() => setShowCount(20)}>20</button>
                                                <button className="dropdown-item" onClick={() => setShowCount(30)}>30</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                filteredData.map((item) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={item._id}>
                                        <Link to={`/products/${item.productName}`}>
                                            <div className="product-item bg-light mb-4">
                                                <div className="product-img position-relative overflow-hidden">
                                                    <img className="img-fluid w-100" src={item.catImg} alt="" />
                                                    <div className="product-action">
                                                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                                                        <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                                                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                                                        <Link to={`/products/${encodeURIComponent(item.productName)}`} className="btn btn-outline-dark btn-square">
                                                            <i className="fa fa-eye"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="text-center py-4">
                                                    <Link className="h6 text-decoration-none text-truncate" to={`/products/${item.productName}`}>{item.productName}</Link>
                                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                                        <h5>₹{item.price}</h5><h6 className="text-muted ml-2"><del>₹{item.oldPrice}</del></h6>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-1">
                                                        {renderStars(Math.round(item.rating * 2) / 2)}
                                                        <small>({item.rating})</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            }
                            <div className="col-12">
                                <nav>
                                    <ul className="pagination justify-content-end">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#">Previous</a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Shop Product End --> */}
                </div>
            </div>
            {/* <!-- Shop End --> */}
            <Footer />
        </div>
    );
}

export default Shop;
