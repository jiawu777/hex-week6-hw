import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const {VITE_API_BASE, VITE_API_PATH}=import.meta.env
const API_BASE = VITE_API_BASE;
const API_PATH = VITE_API_PATH;



const SingleProduct = ()=>{
    const params = useParams();
    const {id}=params;
    const[product,setProduct]=useState({});
    const navigate = useNavigate();


    const getSingleProduct = async(id)=>{
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
            setProduct(res.data.product);
        } catch (error) {
            console.log(error.response);
        }
    }

    const addToCart = async(id,qty=1)=>{
        const data = {
            product_id:id,qty
        }
         try {
            await axios.post(`${API_BASE}/api/${API_PATH}/cart`,{data});
            navigate('/checkout');
        } catch (error) {
            console.log(error.response);
        }
    }

useEffect(()=>{
    getSingleProduct(id);
},[])

    return (
    <div className="container mt-4">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={product.imageUrl}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">
            {product.description}
          </p>
          <p className="card-text">
            <strong>分類:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>單位:</strong> {product.unit}
          </p>
          <p className="card-text">
            <strong>原價:</strong> {product.origin_price} 元
          </p>
          <p className="card-text">
            <strong>現價:</strong> {product.price} 元
          </p>
          <button className="btn btn-primary" onClick={()=>{addToCart(product.id)}}>立即購買</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;