import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {VITE_API_BASE, VITE_API_PATH}=import.meta.env
const API_BASE = VITE_API_BASE;
const API_PATH = VITE_API_PATH;

const Cart=() => {
    const navigate = useNavigate();
    const [cart,setCart]=useState([]);
    const getCartItems = async()=>{
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            if(res.data.data.carts.length===0)return(navigate('/products'));
            setCart(res.data.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const deleteAllCartItems = async()=>{
        try {
            await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
            getCartItems();
        } catch (error) {
            console.log(error.response);
        }
    }

    const updateCartQty = async(id,qty)=>{
        const data = {
            product_id:id,
            qty:Number(qty)
        }
        try {
            await axios.put(`${API_BASE}/api/${API_PATH}/cart/${id}`,{data});
            getCartItems();
        } catch (error) {
            console.log(error.response);
        }
    }

        const deleteCartItem = async(id)=>{

        try {
            await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
            getCartItems();
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=>{
        getCartItems();
    },[])


    return(
        <div className="container">
  <h2>購物車列表</h2>
  <div className="text-end mt-4">
    <button type="button" className="btn btn-outline-danger" onClick={()=>{deleteAllCartItems()}}>
      清空購物車
    </button>
  </div>
  <table className="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">品名</th>
        <th scope="col">數量/單位</th>
        <th scope="col">小計</th>
      </tr>
    </thead>
    <tbody>
{cart?.carts?.map((cartItem)=>{
    return(
        <tr key={cartItem.id}>
        <th scope="row" ></th>
        <td>{cartItem.product.title}</td>
        <td>
            <div className="input-group mb-3">
            <input type="number" className="form-control" aria-label="qty" aria-describedby="basic-addon2" defaultValue={cartItem.qty} onChange={(e)=>{updateCartQty(cartItem.id,e.target.value)}}/>
            <span className="input-group-text" id="basic-addon2">{cartItem.product.unit}</span>
            </div>
        </td>
        <td>{cartItem.total}</td>
        <td>
          <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>{deleteCartItem(cartItem.id)}}>
            刪除
          </button>
        </td>
        <td className="text-end"></td>
      </tr>
    )
})}
    </tbody>
    <tfoot>
      <tr>
        <td className="text-end" colSpan="3">
          總計
        </td>
        <td className="text-end">{cart.final_total}</td>
      </tr>
    </tfoot>
  </table>
</div>
    )
}

export default Cart;