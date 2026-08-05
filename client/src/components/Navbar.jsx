import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/Constants";

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      const res = await axios.post(`${BASE_URL}/auth/logout`, { withCredentials: true });
      if (res?.data?.success) {
        setUser(null);
        navigate("/login");
        toast.success("Logged out successfully");
      }
    }catch(error){
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
              <path
                d="M21 10.5H13C11 10.5 11 13.5 13 13.5H19C21 13.5 21 16.5 19 16.5H11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16.5V19.5C11 21 12 21.5 14 21.5H21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#2DD4BF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold text-gray-700 tracking-tight">
              Shifra{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-teal-400">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Action Buttons */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/builder"
                className="px-5 py-2 rounded-xl bg-linear-to-r from-purple-500 to-teal-400 text-white font-medium hover:opacity-90 transition-opacity text-sm shadow-sm"
              >
                Builder
              </Link>
              <Link
                to="/billing"
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-600 bg-white font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
              >
                Billing
              </Link>
              <div className="border-0 shadow rounded-xl px-2 py-1 flex gap-3 items-center ml-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-emerald-500 flex items-center justify-center shrink-0 border border-white shadow-md">
                  <span className="text-xs font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="pr-2">
                  <div className="text-sm font-medium text-gray-900 leading-tight">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500 leading-tight">
                    {user?.email}
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && user && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4 shadow-lg absolute w-full z-50">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-emerald-500 flex items-center justify-center shrink-0 border border-white shadow-md">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {user?.name}
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/builder"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-500 to-teal-400 text-white font-medium hover:opacity-90 transition-opacity text-sm shadow-sm"
            >
              Builder
            </Link>
            <Link
              to="/billing"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 bg-white font-medium hover:bg-gray-50 transition-colors text-sm shadow-sm"
            >
              Billing
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-100 text-red-600 bg-red-50 font-medium hover:bg-red-100 transition-colors text-sm shadow-sm mt-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
