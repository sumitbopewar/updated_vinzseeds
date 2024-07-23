import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Make sure to import the CSS file
import axios from 'axios';

function Header() {
  const [cartLength, setCartLength] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:8080/api/cart/').then((response) => setCartLength(response.data.length));
  })
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      const topBar = document.getElementById('top-bar');
      const navBar = document.getElementById('nav-bar');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        topBar.classList.add('hidden');
        navBar.classList.add('fixed-top');
      } else {
        header.classList.remove('scrolled');
        topBar.classList.remove('hidden');
        navBar.classList.remove('fixed-top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="header" className="fixed-top" style={{ marginBottom: '100px' }}>
      {/* Topbar Start */}
      <div id="top-bar" className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <Link className="text-body mr-3" to="/about">About</Link>
              <Link className="text-body mr-3" to="/contact">Contact</Link>
              <Link className="text-body mr-3" to="/help">Help</Link>
              <Link className="text-body mr-3" to="/faqs">FAQs</Link>
            </div>
          </div>
          <div className="col-lg-6 text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  My Account
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item" to="/signin">Sign in</Link>
                  <Link className="dropdown-item" to="/signup">Sign up</Link>
                </div>
              </div>
              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  USD
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">EUR</button>
                  <button className="dropdown-item" type="button">GBP</button>
                  <button className="dropdown-item" type="button">CAD</button>
                </div>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  LANG
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">ENG</button>
                  <button className="dropdown-item" type="button">MAR</button>
                  <button className="dropdown-item" type="button">HIN</button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <Link to="/wishlist" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
              </Link>
              <Link to="/cart" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <img src="https://vinzseeds.in/home/image/logo.png" alt="" width="100px" />
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for products" />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h6 className="m-0">+91 8177819117</h6>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div id="nav-bar" className="container-fluid mb-30" style={{ background: '#52b788' }}>
        <div className="row px-xl-5" style={{ background: '#52b788' }}>
          <div className="col-lg-3 d-none d-lg-block">
            <button
              className="btn d-flex align-items-center justify-content-between w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: '65px', padding: '0 30px', background: '#95d5b2' }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2"></i>Categories
              </h6>
              <i className="fa fa-angle-down text-dark"></i>
            </button>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: 'calc(100% - 30px)', zIndex: 999 }}
            >
              <div className="navbar-nav w-100">
                <div className="nav-item dropdown dropright">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Seeds <i className="fa fa-angle-right float-right mt-1"></i>
                  </Link>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                    <Link to="/mens-dresses" className="dropdown-item">Gorgeous Flowers</Link>
                    <Link to="/womens-dresses" className="dropdown-item">Exotic Vegetables</Link>
                  </div>
                </div>
                <Link to="/Gorgeous" className="nav-item nav-link">Gorgeous Flowers</Link>
                <Link to="/Dummy2" className="nav-item nav-link">Exotic Vegetables</Link>
                <Link to="/Dummy3" className="nav-item nav-link">Pots & Tools</Link>
                <Link to="/Dummy4" className="nav-item nav-link">DIY & Hand Crafted</Link>
                <Link to="/Dummy5" className="nav-item nav-link">Live Plants</Link>
              </div>
            </nav>
          </div>
          <div className="col-lg-9" style={{ background: "#52b788" }}>
            <nav className="navbar navbar-expand-lg navbar-dark py-3 py-lg-0 px-0">
              <Link to="/" className="text-decoration-none d-block d-lg-none">
                <img src="https://vinzseeds.in/home/image/logo.png" alt="" width="100px" />
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link active">Home</Link>
                  <Link to="/shop" className="nav-item nav-link">Shop</Link>
                  <Link to="/product_details" className="nav-item nav-link">Shop Detail</Link>
                  <div className="nav-item dropdown">
                    <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                      Pages <i className="fa fa-angle-down mt-1"></i>
                    </Link>
                    <div className="dropdown-menu rounded-0 border-0 m-0" style={{ background: '#95d5b2' }}>
                      <Link to="/cart" className="dropdown-item">Shopping Cart</Link>
                      <Link to="/checkout" className="dropdown-item">Checkout</Link>
                    </div>
                  </div>
                  <Link to="/contact" className="nav-item nav-link">Contact</Link>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link to="/wishlist" className="btn px-0">
                    <i className="fas fa-heart text-white"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>0</span>
                  </Link>
                  <Link to="/cart" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-white"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: '2px' }}>{cartLength}</span>
                  </Link>
                  <Link to="/login" className="">
                  <i className="fas fa-user text-white" style={{marginLeft: "10px"}} title="User Profile"></i>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  );
}

export default Header;
