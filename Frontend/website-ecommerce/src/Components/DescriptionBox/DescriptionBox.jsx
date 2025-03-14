import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Review</div>
        </div>  
        <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform that fatcility buying and selling of products or services over the internet, serves as a virtual marketplace where business and indivition showcase their product, interact, with customers, and conduction transactions without the need for a pbysical presence. E-commerce website have gained immense popular due to their convenient accessibility and the global reach they offer</p>
            <p>E-commerce website typically display products or services a detailed descriptions, images, prices and any available (e.g., sizes, colors). Each product usually has its own with relevant information</p>
        </div>
    </div>
  )
}

export default DescriptionBox
