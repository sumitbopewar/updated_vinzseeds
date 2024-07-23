import React from 'react';

function Slider() {
  return (
    <div>
      {/* <!-- Carousel Start --> */}
      <div className="container-fluid mb-3" style={{ marginTop: "30vh" }}>
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                <li data-target="#header-carousel" data-slide-to="1"></li>
                <li data-target="#header-carousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item position-relative active" style={{ height: '430px' }}>
                  <img className="position-absolute w-100 h-100" src="https://images.unsplash.com/photo-1599778149872-c6e6a83af693?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ objectFit: 'cover' }} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: '700px' }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown"> <span className="text-white fw-bold" style={{ textShadow: "1px 2px 1px gray" }}>THE FLOWERS</span></h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">We Share The Flowers, We Care Your Plant, We Plant For You, We Share The Seeds, We Share The Love.</p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item position-relative" style={{ height: '430px' }}>
                  <img className="position-absolute w-100 h-100" src="https://images.unsplash.com/photo-1526864722801-3595aa1401de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ objectFit: 'cover' }} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: '700px' }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown"><span className="text-white fw-bold" style={{ textShadow: "1px 2px 1px gray" }}>THE FLOWERS</span></h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Together We Can Restore The Seeds</p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                    </div>
                  </div>
                </div>
                <div className="carousel-item position-relative" style={{ height: '430px' }}>
                  <img className="position-absolute w-100 h-100" src="https://plus.unsplash.com/premium_photo-1678655636569-b2786b3c9ac3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ objectFit: 'cover' }} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3" style={{ maxWidth: '700px' }}>
                      <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown"><span className="text-white fw-bold" style={{ textShadow: "1px 2px 1px gray" }}>THE FLOWERS</span></h1>
                      <p className="mx-md-5 px-5 animate__animated animate__bounceIn">We Know You Love Trees, Just Like US!</p>
                      <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: '200px' }}>
              <img className="img-fluid" src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
            <div className="product-offer mb-30" style={{ height: '200px' }}>
              <img className="img-fluid" src="https://plus.unsplash.com/premium_photo-1678656664303-0f13a5fcfffb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Carousel End --> */}
    </div>
  );
}

export default Slider;
