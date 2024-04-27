import React from 'react'
import AddProductForm from './AddProductForm'
import Navbar from '../../Components/Navbar'
import Table from './Table'
function AddProduct() {
  return (
    <div>
       <Navbar/>
         <h1>Add product</h1>
         <AddProductForm />
          <hr></hr>
        <Table/>

           
    </div>
  )
}

export default AddProduct