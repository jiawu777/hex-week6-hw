import { NavLink, Outlet } from "react-router-dom"

const FrontendLayout = ()=>{
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                     <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">首頁</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cart">購物車</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/products">產品列表</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet/>
            <footer>2026 Jia Demo</footer>
        </>
    )
}

export default FrontendLayout