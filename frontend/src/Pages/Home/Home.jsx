import React from 'react'
import Header from '../../Components/Header/Header'
import Slider from '../../Components/Slider/Slider'
import Feature from '../../Components/Feature/Feature'
import Categories from '../../Components/Categories/Categories'
import Products from '../../Components/Products/Products'
import Offer from '../../Components/Offer/Offer'
import Product from '../../Components/RecentProduct/Product'
import Footer from '../../Components/Footer/Footer'

function Home() {
  return (
    <div>
        <Header />
        <Slider />
        <Feature />
        <Categories />
        <Products />
        <Offer />
        <Product />
        <Footer />
    </div>
  )
}

export default Home