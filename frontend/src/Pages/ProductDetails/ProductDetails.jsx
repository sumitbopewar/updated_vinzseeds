import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function ProductDetails({ productId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const productPath = location.pathname;

  const [product, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/reviews/${productId}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
      });
  }, [productId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/reviews', {
      productId,
      name,
      email,
      rating,
      message,
    })
      .then((res) => {
        console.log('Review submitted successfully:', res.data);
        setReviews([...reviews, { name, email, rating, message, date: new Date() }]);
        setName('');
        setEmail('');
        setRating(0);
        setMessage('');
      })
      .catch((err) => {
        console.error('Error submitting review:', err);
      });
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!weight || !color) {
      alert('Please select weight and color');
      return;
    }

    const cartData = {
      product,
      quantity,
      weight,
      color
    };

    try {
      // Fetch the current cart data
      const response = await axios.get('http://localhost:8080/api/cart');
      const cartItems = response.data;

      // Check if the product with the same weight and color already exists in the cart
      const existingItem = cartItems.find(item =>
        item.product.productName === product.productName &&
        item.weight === weight &&
        item.color === color
      );

      if (existingItem) {
        alert('This product is already in the cart with the selected weight and color.');
      } else {
        // Add the product to the cart
        const res = await axios.post('http://localhost:8080/api/cart-data', cartData);
        console.log('Added to cart:', res.data);
        setAddedToCart(true);
        navigate('/cart', { state: { product } });
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api${productPath}`)
      .then(res => setProductDetails(res.data))
      .catch(err => console.error('Error fetching product details:', err));
  }, [productPath]);

  if (!product) {
    return <div>Loading product data...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container-fluid pb-5" style={{ marginTop: "30vh" }}>
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner bg-light">
                <div className="carousel-item active">
                  <img className="" src={product.catImg} alt="Image" style={{
                    objectFit: "contain",
                    height: "450px", width: "100%",
                  }} />
                </div>
                {
                  product.productImages.map((image, index) => {
                    return (
                      <div className="carousel-item" key={index}>
                        <img className="" src={image} alt="Image" style={{
                          objectFit: "contain",
                          height: "450px", width: "100%"
                        }} />
                      </div>
                    );
                  })
                }
              </div>
              <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                <i className="fa fa-2x fa-angle-left text-dark"></i>
              </a>
              <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                <i className="fa fa-2x fa-angle-right text-dark"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.productName}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  {[...Array(5)].map((_, i) => (
                    <small key={i} className={`fa ${i < Math.floor(product.rating) ? 'fa-star' : i < product.rating ? 'fa-star-half-alt' : 'fa-star text-secondary'}`}></small>
                  ))}
                </div>
                <small className="pt-1">({product.rating})</small>
              </div>

              <h3 className="font-weight-semi-bold mb-4">₹{product.price}</h3>
              <p className="mb-4">{product.description}</p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Weights:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="weight-1"
                      name="weight"
                      value="10g"
                      onChange={e => setWeight(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="weight-1">10g</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="weight-2"
                      name="weight"
                      value="20g"
                      onChange={e => setWeight(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="weight-2">20g</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="weight-3"
                      name="weight"
                      value="50g"
                      onChange={e => setWeight(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="weight-3">50g</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="weight-4"
                      name="weight"
                      value="100g"
                      onChange={e => setWeight(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="weight-4">100g</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="weight-5"
                      name="weight"
                      value="200g"
                      onChange={e => setWeight(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="weight-5">200g</label>
                  </div>
                </form>
              </div>

              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Colors:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-1"
                      name="color"
                      value="Black"
                      onChange={e => setColor(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="color-1">Black</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-2"
                      name="color"
                      value="White"
                      onChange={e => setColor(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="color-2">White</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-3"
                      name="color"
                      value="Red"
                      onChange={e => setColor(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="color-3">Red</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-4"
                      name="color"
                      value="Blue"
                      onChange={e => setColor(e.target.value)}
                    />
                    <label className="custom-control-label" htmlFor="color-4">Blue</label>
                  </div>
                </form>
              </div>

              <div className="d-flex align-items-center mb-4 pt-2">
                <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus" onClick={handleDecrement}>
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus" onClick={handleIncrement}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3" onClick={handleAddToCart}>
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>
              {addedToCart && <div className="alert alert-success" role="alert">Item added to cart!</div>}
            </div>
          </div>
        </div>

        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
                <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
                <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews ({reviews.length})</a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  <p>Product description goes here...</p>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <h4 className="mb3">Additional Information</h4>
                  <p>Additional information goes here...</p>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">{reviews.length} review(s) for "Product Name"</h4>
                      {reviews.map((review, index) => (
                        <div className="media mb-4" key={index}>
                          <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: '45px' }} />
                          <div className="media-body">
                            <h6>{review.name}<small> - <i>{new Date(review.date).toLocaleDateString()}</i></small></h6>
                            <div className="text-primary mb-2">
                              {[...Array(5)].map((_, i) => (
                                <i className={i < review.rating ? 'fas fa-star' : 'far fa-star'} key={i}></i>
                              ))}
                            </div>
                            <p>{review.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-6">
                      <h4 className="mb-4">Leave a review</h4>
                      <small>Your email address will not be published. Required fields are marked *</small>
                      <div className="d-flex my-3">
                        <p className="mb-0 mr-2">Your Rating * :</p>
                        <div className="text-primary">
                          {[...Array(5)].map((_, i) => (
                            <i className={i < rating ? 'fas fa-star' : 'far fa-star'} key={i} onClick={() => setRating(i + 1)}></i>
                          ))}
                        </div>
                      </div>
                      <form onSubmit={handleReviewSubmit}>
                        <div className="form-group">
                          <label htmlFor="message">Your Review *</label>
                          <textarea id="message" cols="30" rows="5" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Your Name *</label>
                          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Your Email *</label>
                          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group mb-0">
                          <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
