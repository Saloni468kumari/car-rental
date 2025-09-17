import NavbarOwner from "../../components/owner/NavbarOwner";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    // Redirect to home if not an owner
    if (!isOwner) {
      navigate('/');
    }
  }, [isOwner, navigate]); // include navigate in deps

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOwner />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
