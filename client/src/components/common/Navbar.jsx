import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <NavLink
          to="/"
          className="sm:text-xl font-bold text-black uppercase bg-indigo-50 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm p-1"
        >
          Know Ur Edge
        </NavLink>
        <div>
          <NavLink
            to="/login"
            className="text-sm px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-sm px-4 py-2 text-white bg-neutral-600 rounded-lg ml-2 hover:bg-neutral-700 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
