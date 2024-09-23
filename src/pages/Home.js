import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className='bg-gray-50'>
      <CategoryList />
      <BannerProduct />
      <div className='-mt-60 grid'>
        <HorizontalCardProduct category={"printers"} heading={"Printers for home"} />
        <HorizontalCardProduct category={"airpods"} heading={"Explore Airpods"} />
      </div>

      <VerticalCardProduct category={"mobiles"} heading={"Best in Mobiles"} />
      <VerticalCardProduct category={"mouse"} heading={"PC Accessories"} />
      <VerticalCardProduct category={"camera"} heading={"Cameras & Lens"} />
      <VerticalCardProduct category={"headphone"} heading={"Feel the Music with on Head Headphones"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Freezers"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"TV's"} />

    </div>
  )
}

export default Home