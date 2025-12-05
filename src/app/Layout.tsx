import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <Outlet />
     </div>
  )
}

export default Layout