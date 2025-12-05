import { Link } from "react-router-dom"
import logo from "/assets/sun--shade-logo.png"

const Navbar = () => {
    return (
        <nav className="my-6 sm:my-4 lg:my-8 flex justify-start">
            <Link to="/"> 
                <img
                    src={logo}
                    alt="Sun & Shade Logo"
                    className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto invert cursor-pointer"
                />
            </Link>
        </nav>
    )
}

export default Navbar