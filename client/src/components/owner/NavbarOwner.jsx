import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div
      className="flex items-center justify-between px-6 md:px-10 py-3 
      text-gray-600 border-b border-borderColor bg-white shadow-sm"
    >
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="CarRental Logo" className="h-8 cursor-pointer" />
      </Link>

      {/* Welcome text */}
      <p className="text-sm md:text-base font-medium">
        Welcome, <span className="text-blue-600">{user?.name || "Owner"}</span>
      </p>
    </div>
  );
};

export default NavbarOwner;
