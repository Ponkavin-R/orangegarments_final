import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalProductCard'

const Home = () => {
  return (
    <div >
      <CategoryList />
      <BannerProduct/>

      
      {/* //Horzontal card for airpodes */}
      <HorizontalProductCard category={"shirt"} heading={"Top Shirts's"}/>
      {/* //Horzontal card for Watches */}
      <HorizontalProductCard category={"pant"} heading={"Popular Pants"}/>
      {/* //Horzontal card for Earphones */}
      <HorizontalProductCard category={"sweater"} heading={"Best Selling Sweaters"}/>
      {/* //Vertical card for Mobiles */}
      <VerticalProductCard category={"hoodie"} heading={"Trending Hoodies"}/>
      

    </div>
  )
}

export default Home
