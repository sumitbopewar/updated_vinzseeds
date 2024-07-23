import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './cart.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Cart() {
    const [products, setProducts] = useState([]);
    const [notification, setNotification] = useState(null);
    const location = useLocation();
    const cartProduct = location.state;

    useEffect(() => {
        axios.get('http://localhost:8080/api/cart')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching cart data:', error));
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedProducts = products.map(product =>
            product._id === id ? { ...product, quantity: newQuantity } : product
        );
        setProducts(updatedProducts);
    };

    const handleRemoveProduct = (productName) => {
        axios.delete(`http://localhost:8080/api/cart/${productName}`)
            .then(() => {
                const updatedProducts = products.filter(product => product.product.productName !== productName);
                setProducts(updatedProducts);
                showNotification(`Removed ${productName}`);
            })
            .catch(error => console.error('Error removing product:', error));
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000); // Remove notification after 3 seconds
    };

    const calculateTotal = () => {
        return products.reduce((total, product) => {
            return total + (product.product.price * product.quantity);
        }, 0);
    };

    return (
        <div>
            <Header />
            <div className="container-fluid" style={{ marginTop: "30vh" }}>
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Shopping Cart</span>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td className="align-middle">
                                            <img src={product.product.catImg} alt={product.product.productName} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> {product.product.productName}
                                        </td>
                                        <td className="align-middle">₹{product.product.price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button
                                                        className="btn btn-sm btn-primary btn-minus"
                                                        onClick={() => handleQuantityChange(product._id, product.quantity - 1)}
                                                        disabled={product.quantity <= 1}
                                                    >
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm bg-secondary border-0 text-center"
                                                    value={product.quantity}
                                                    readOnly
                                                />
                                                <div className="input-group-btn">
                                                    <button
                                                        className="btn btn-sm btn-primary btn-plus"
                                                        onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
                                                    >
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">₹{product.product.price * product.quantity}</td>
                                        <td className="align-middle">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemoveProduct(product.product.productName)}
                                            >
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Cart Summary</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>₹{calculateTotal()}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">₹10</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>₹{calculateTotal() + 10}</h5>
                                </div>
                                <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {notification && (
                <div className="notification">
                    <p>{notification}</p>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Cart;
