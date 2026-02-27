import {createHashRouter} from "react-router-dom"
import Home from "./views/front/Home"
// import Cart from "./views/front/Cart"
import Notfound from "./views/front/NotFound"
// import Products from "./views/front/Products"
// import SingleProduct from "./views/front/SingleProduct"
import FrontendLayout from "./layout/FrontendLayout"
import Checkout from "./views/front/Checkout"
import Login from "./views/front/Login"
import BackendLayout from "./layout/BackendLayout"
import AdminProducts from "./views/back/AdminProducts"

export const router = createHashRouter([
    {path:'/',element:<FrontendLayout/>,children:[
        {path:'/',element:<Home/>},
        // {path:'/cart',element:<Cart/>},
        {path:'/checkout',element:<Checkout/>},
        // {path:'/products',element:<Products/>},
        // {path:'/singleProduct/:id',element:<SingleProduct/>},
        {path:'/login',element:<Login/>},
    ]},
    {path:'/',element:<BackendLayout/>,children:[
        {path:'/admin/products',element:<AdminProducts/>},
    ]},

{path:'*',element:<Notfound/>},
])