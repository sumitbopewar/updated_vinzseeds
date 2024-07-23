import React from 'react';

function Categories() {
  const categories = [
    { name: 'All', imgSrc: 'img/sakura.png', productsCount: 120 },
    { name: 'Gorgeous Flowers', imgSrc: 'img/sunflower.png', productsCount: 100 },
    { name: 'Exotic Vegetables', imgSrc: 'img/papaya1.png', productsCount: 150 },
    { name: 'Pots & Tools', imgSrc: 'img/plant-pot.png', productsCount: 140},
    { name: 'DIY & Hand Crafted', imgSrc: 'img/plant.png', productsCount: 100 },
    { name: 'Live Plants', imgSrc: 'img/succulent.png', productsCount: 150 }
  ];

  return (
    <div>
      {/* <!-- Categories Start --> */}
      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Categories</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {categories.map((category, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
              <a className="text-decoration-none" href="">
                <div className="cat-item d-flex align-items-center mb-4">
                  <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
                    <img className="img-fluid" src={category.imgSrc} alt={category.name} />
                  </div>
                  <div className="flex-fill pl-3">
                    <h6>{category.name}</h6>
                    <small className="text-body">{category.productsCount} Products</small>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      {/* <!-- Categories End --> */}
    </div>
  );
}

export default Categories;
