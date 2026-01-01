import logo from "../assets/images/logo.svg";
import cartIcon from "../assets/images/cartIcon.svg";
import searchIcon from "../assets/images/searchIcon.svg";
import userIcon from "../assets/images/userIcon.svg";

function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between  py-2">
        
        {/* LEFT : Logo */}
       <div className="flex items-center mr-4">
  <img src={logo} alt="Logo" className="h-4" />
</div>


        {/* MENU - Đã chỉnh nhỏ lại */}
     <nav className="hidden md:flex justify-between w-96 text-[12px] font-medium">

          <a className="hover:text-blue-600 cursor-pointer">Shop</a>
          <a className="hover:text-blue-600 cursor-pointer">On Sale</a>
          <a className="hover:text-blue-600 cursor-pointer">New Arrivals</a>
          <a className="hover:text-blue-600 cursor-pointer">Brands</a>
        </nav>

        {/* SEARCH + ICONS */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center border rounded-full px-2 py-1">
            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2 opacity-60" />
            <input
              placeholder="Search..."
              className="outline-none text-sm w-32"
            />
          </div>

          {/* Icons */}
          <img src={cartIcon} alt="Cart" className="w-4 h-4 cursor-pointer" />
          <img src={userIcon} alt="User" className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;