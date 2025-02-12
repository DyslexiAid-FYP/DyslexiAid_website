import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // State for storing error messages

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    // Password confirmation check for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setError(""); // Clear error on success

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onAuthSuccess(); // Update authentication state
        navigate("/");
      } else {
        setIsLogin(true);
      }
    } catch (error) {
      setError(error.message); // Set error message in UI
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0a0d14] to-[#1a1f2e] p-6">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-[#2AA198] via-[#238F8A] to-[#1C7D7C] p-0.5">
          
          {/* Left Section - Welcome Message */}
          <div className="w-full md:w-1/2 bg-[#151923] p-12 flex flex-col justify-center items-center text-center rounded-tl-2xl rounded-bl-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to <span className="text-[#40E0D0]">DyslexiAid</span>
            </h2>
            <p className="text-gray-400 mb-8 mt-8">
              Empowering individuals with dyslexia through innovative solutions
            </p>
          </div>

          {/* Right Section - Auth Form */}
          <div className="w-full md:w-1/2 bg-[#0a0d14] p-12 rounded-tr-2xl rounded-br-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {isLogin ? "Sign In" : "Create Account"}
            </h3>

            {/* Display Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field (Only for Registration) */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-[#151923] text-white placeholder:text-gray-500 focus:border-[#2AA198] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Email Field */}
              <input
  id="email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="you@example.com"
  className="w-full px-4 py-2 rounded-md border border-gray-700 bg-[#151923] text-white placeholder:text-gray-500 focus:border-[#2AA198] focus:outline-none transition-colors !important"
/>


              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 bg-[#151923] text-white placeholder:text-gray-500 focus:border-[#2AA198] focus:outline-none transition-colors"
                />
              </div>

              {/* Confirm Password (Only for Registration) */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 bg-[#151923] text-white placeholder:text-gray-500 focus:border-[#2AA198] focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#2AA198] text-black rounded-md hover:bg-[#238F8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2AA198] focus:ring-opacity-50"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle Between Login & Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(""); // Clear error when switching forms
                  }}
                  className="text-[#2AA198] hover:underline focus:outline-none"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {/* Terms & Privacy */}
            <div className="mt-8 text-center text-xs text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#2AA198] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#2AA198] hover:underline">
                Privacy Policy
              </a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
