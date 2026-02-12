import logo from "../assets/images/logo.svg";
import cartIcon from "../assets/images/cartIcon.svg";
import searchIcon from "../assets/images/searchIcon.svg";
import userIcon from "../assets/images/userIcon.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [searchKeyword, setSearchKeyword] = useState("");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("authChange", handler);
    return () => window.removeEventListener("authChange", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/auth");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword("");
    }
  };

  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">

        {/* LOGO */}
        <Link to="/" className="flex items-center mr-4 hover:opacity-80 transition">
          <img src={logo} alt="Logo" className="h-4" />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex justify-between w-96 text-[12px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Shop
          </NavLink>

          <NavLink 
            to="/on-sale"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            On Sale
          </NavLink>

          <NavLink 
            to="/new-arrivals"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            New Arrivals
          </NavLink>

          <NavLink 
            to="/brands"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Brands
          </NavLink>
        </nav>

        {/* SEARCH + ICONS */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center border rounded-full px-2 py-1">
            <img
              src={searchIcon}
              alt="Search"
              className="w-4 h-4 mr-2 opacity-60"
            />
            <input
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="outline-none text-sm w-32"
            />
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative cursor-pointer group">
            <img
              src={cartIcon}
              alt="Cart"
              className="w-4 h-4 group-hover:opacity-70 transition"
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm"
              >
                <img src={userIcon} alt="User" className="w-5 h-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="cursor-pointer group">
              <img
                src={userIcon}
                alt="User"
                className="w-4 h-4 group-hover:opacity-70 transition"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
