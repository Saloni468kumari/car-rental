import { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import "../index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 
        py-4 text-gray-600 border-b border-borderColor relative transition-all
        ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
    >
      {/* Logo */}
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="CarRental Logo"
          className="h-8"
        />
      </Link>

      {/* Menu links */}
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16
          max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row
          items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all
          duration-300 z-50 ${
            location.pathname === "/" ? "bg-light" : "bg-white"
          } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {/* Search (desktop only) */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
          <input
            type="text"
            aria-label="Search cars"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search Cars"
          />
          <img src={assets.search_icon} alt="search icon" />
        </div>

        {/* Actions */}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="cursor-pointer px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] 
              transition-all text-white rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.nav>
  );
};

export default Navbar;
