import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const {VITE_API_BASE, VITE_API_PATH}=import.meta.env
const API_BASE = VITE_API_BASE;
const API_PATH = VITE_API_PATH;

const Products = ()=>{
const [productData,setProductData]=useState([]);
    
const getProducts = async()=>{
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
            setProductData(res.data.products);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=>{
        getProducts();
    },[])
    
    
    return(
        <div className="container text-center">
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {productData.map((item)=>(
                <div className="card col" key={item.id} style={{width: "18rem"}}>
                    <img src={item.imageUrl} className="card-img-top" alt="圖片無法顯示"/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <NavLink to={`/singleProduct/${item.id}`} className="btn btn-primary">更多細節</NavLink>
                    </div>
                </div>
            ))}
            </div>
        </div>

)}

export default Products;