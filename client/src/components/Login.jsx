import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  // Get values & functions from AppContext
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  // Local states for form
  const [state, setState] = useState("login"); // toggle between "login" and "register"
  const [name, setName] = useState(""); // only needed for registration
  const [email, setEmail] = useState(""); // email input
  const [password, setPassword] = useState(""); // password input

  // Form submit handler
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      // Send request to backend depending on state (login or register)
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        // ✅ Success case
        navigate("/"); // redirect to home
        setToken(data.token); // save token in global context
        localStorage.setItem("token", data.token); // persist token in browser
        setShowLogin(false); // close the login modal
      } else {
        // ❌ Error case from backend
        toast.error(data.message);
      }
    } catch (error) {
      // ❌ Unexpected error (like network issues)
      toast.error(error.message);
    }
  };

  return (
    // Background overlay (dark blur) that closes modal if clicked
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50"
    >
      {/* Login/Register Form (click inside should not close modal) */}
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 sm:p-10 w-full max-w-md flex flex-col gap-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          <span className="text-blue-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* Name input (only visible during Sign Up) */}
        {state === "register" && (
          <div className="flex flex-col">
            <label className="text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* Email input */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password input */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Toggle login/register */}
        <p className="text-sm text-gray-600 text-center">
          {state === "register"
            ? "Already have an account? "
            : "Create an account? "}
          <span
            onClick={() =>
              setState(state === "login" ? "register" : "login")
            }
            className="text-blue-600 cursor-pointer font-medium"
          >
            Click here
          </span>
        </p>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
