import { Outlet } from "react-router-dom"

const FrontendLayout = ()=>{
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                     <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">首頁</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/cart">購物車</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/products">產品列表</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/#/singleProduct">單一產品列表</a>
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