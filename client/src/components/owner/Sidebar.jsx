import { NavLink, useLocation } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation(); // current URL path

  // Initial profile image: either from localStorage (previewed) or user data
  const [image, setImage] = useState(() => {
    return localStorage.getItem("profilePic") || user.image;
  });

  // New image file to upload
  const [newImage, setNewImage] = useState(null);
  // Base64 preview for UI
  const [preview, setPreview] = useState(null);

  // Handle image selection
  const handleFileChange = (file) => {
    setNewImage(file);

    // Generate preview to show immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Upload new profile image
  const updateImage = async () => {
    if (!newImage) {
      toast.error("Please select an image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", newImage); // send file, not base64

      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data.success) {
        fetchUser(); // refresh user info
        toast.success(data.message);
        setImage(preview); // update UI immediately
        localStorage.setItem("profilePic", preview); // persist preview
        setNewImage(null);
        setPreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8
      max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">

      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={preview || image}
            alt="profile"
            className="h-12 md:h-30 w-12 md:w-30 rounded-full mx-auto object-cover"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => handleFileChange(e.target.files[0])}
          />

          {/* Hover overlay for edit */}
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10
            rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {/* Save button appears only if new image selected */}
      {newImage && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 
            bg-blue-500/10 text-blue-600 cursor-pointer rounded-md text-xs"
        >
          Save <img src={assets.check_icon} width={13} alt="Save" />
        </button>
      )}

      {/* Display owner name */}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      {/* Sidebar Links */}
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-blue-500/10 text-blue-600" // active link styling
                : "text-gray-600"
            }`}
          >
            <img
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt="icon"
            />
            <span className="max-md:hidden">{link.name}</span>

            {/* Active indicator bar */}
            <div
              className={`${
                link.path === location.pathname && "bg-blue-600"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
