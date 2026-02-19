import {createHashRouter, RouterProvider} from "react-router-dom"
import Home from "./views/front/Home"
import Cart from "./views/front/Cart"
import Notfound from "./views/front/NotFound"
import Products from "./views/front/Products"
import SingleProduct from "./views/front/SingleProduct"
import FrontendLayout from "./layout/FrontendLayout"

export const router = createHashRouter([
    {path:'/',element:<FrontendLayout/>,children:[
        {path:'/',element:<Home/>},
        {path:'/cart',element:<Cart/>},
        {path:'/products',element:<Products/>},
        {path:'/singleProduct',element:<SingleProduct/>},
    ]},
{path:'*',element:<Notfound/>},
])