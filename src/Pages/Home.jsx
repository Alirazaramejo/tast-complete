import React from 'react'
import Navbar from '../Components/Navbar'

import ProductListing from '../Components/ProductListing/ProductListing'
function Home() {
  return (
    <div>
        <Navbar/>
        
        <ProductListing/>
    </div>
  )
}

export default Home