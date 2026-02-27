import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import  validation  from '../../utils/validation';
import Products from './Products';
import Cart from './Cart';

const {VITE_API_BASE, VITE_API_PATH}=import.meta.env
const API_BASE = VITE_API_BASE;
const API_PATH = VITE_API_PATH;

const Checkout = () => {
    const [cart,setCart]=useState({});
    const [listLoadingState,setListLoadingState]=useState([]);
    const {register, handleSubmit,formState:{errors,isValid},reset} = useForm(
        {
            mode:"onChange",
        //     defaultValues:{
        //     email:"test@gamil.com",
        //     name:"小明",
        //     tel:"0912345678",
        //     address:"臺北市信義區信義路5段7號",
        //     message:"請盡快送達，謝謝！",
        // }
    }
    )

     const getCartItems = async()=>{
        try {
            const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
            setCart(res.data.data);
            return res.data.data;
        } catch (error) {
            alert("取得購物車資料失敗:" + error.response.data.message);
        }
    }

    const addNewCartItem = async(id,qty=1)=>{
            const data = {
                    product_id:id,
                    qty:Number(qty)
            }

            try {
                await axios.post(`${API_BASE}/api/${API_PATH}/cart`,{data});
                await getCartItems();
            } catch (error) {
                alert("新增購物車商品失敗:" + error.response.data.message);
            }
        }

    const updateCartQty = async(cartId,productId,qty)=>{
            const data = {
                    product_id:productId,
                    qty:Number(qty)
            }
            try {
                await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`,{data});
                await getCartItems();
            } catch (error) {
                alert("更新購物車商品數量失敗:" + error.response.data.message);
            }
        }

    const handleLoadingState = async(id)=>{
        setListLoadingState((prevState)=>([...prevState,id]));
        const cartItem = cart.carts.find((cartItem)=> cartItem.product_id === id);
        const cartId = cartItem ? cartItem.id : null;
        const productId = id;

            try {
                if(cartItem){
                    let newQty = cartItem.qty + 1;
                    await updateCartQty(cartId,productId,newQty);
                 
                }else{
                    await addNewCartItem(id,1)
                }
            } catch (error) {
                alert("處理購物車商品增減失敗:" + error.response.data.message);
            }finally{
                setListLoadingState((prev)=>{
                    return prev.filter((i)=> i !== id)
                })}

    }

    const onSubmit = async(data) =>{
        const dataToSend = {
                user: {
                name: data.name,
                email: data.email,
                tel: data.tel,
                address: data.address
                },
                message: data.message
                }
        
            try {
                const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`,{data:dataToSend});
                alert(res.data.message);
                reset();
                getCartItems();
            } catch (error) {
                alert("訂單傳送失敗:" + error.response.data.message);
            }

            }

    return (
        <>
        <Products  cart={cart} getCartItems={getCartItems} updateCartQty={updateCartQty} addNewCartItem={addNewCartItem} handleLoadingState={handleLoadingState} listLoadingState={listLoadingState}/>
        < br/>
        <Cart getCartItems={getCartItems} cart={cart} updateCartQty={updateCartQty}/>
        <div className="container" style={{width: "600px"}}>
            <div className="my-5 row justify-content-center">
                <form className="col-lg-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="請輸入 Email"
                            {...register("email",validation.email)}
                        />
                        <p className="text-danger">{errors.email?.message}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        收件人姓名
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="請輸入姓名"
                        {...register("name",validation.name)}
                    />
                    <p className='text-danger'>{errors.name?.message}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                        收件人電話
                    </label>
                    <input
                        id="tel"
                        name="tel"
                        type="tel"
                        className="form-control"
                        placeholder="請輸入電話"
                        {...register("tel",validation.tel)}
                    />
                    <p className='text-danger'>{errors.tel?.message}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        收件人地址
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="form-control"
                        placeholder="請輸入地址"
                        {...register("address",validation.address)}
                    />
                    <p className='text-danger'>{errors.address?.message}</p>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                        留言
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        cols="30"
                        rows="10"
                        {...register("message")}
                    ></textarea>
                    </div>
                    <div className="text-end">
                    <button type="submit" className="btn btn-danger" disabled={!isValid}>
                        送出訂單
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
        )
};

export default Checkout;