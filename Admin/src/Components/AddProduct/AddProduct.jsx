import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/data-collection.png'

const AddProduct = () => {

  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  const Add_product = async () => {
    // Kiểm tra nếu có ảnh
    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Kiểm tra nếu có đủ thông tin sản phẩm
    if (!productDetails.name || !productDetails.new_price || !productDetails.old_price || !productDetails.category) {
      alert("Please fill all the fields");
      return;
    }

    let responseData;
    let product = { ...productDetails }; // Lưu lại thông tin sản phẩm

    // Tạo FormData để gửi lên server
    let formData = new FormData();
    formData.append('product', image);

    try {
      // Gửi yêu cầu upload ảnh
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData,
      });
      responseData = await response.json();

      if (responseData.success) {
        product.image = responseData.image_url; // Cập nhật URL ảnh vào sản phẩm

        // Gửi yêu cầu thêm sản phẩm vào cơ sở dữ liệu
        const addResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product),
        });
        const addData = await addResponse.json();

        // Thông báo kết quả
        if (addData.success) {
          alert("Product Added Successfully");
        } else {
          alert("Failed to Add Product");
        }
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type Here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_product} className='addproduct-btn'>ADD PRODUCT</button>
    </div>
  )
}

export default AddProduct;
