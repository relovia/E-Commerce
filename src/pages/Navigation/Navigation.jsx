//Router
import { Outlet, Link } from "react-router-dom";
//React Icons
import { HiMenu, HiX, HiShoppingBag } from "react-icons/hi";
//Logo
import Logo from "../../assets/logo.svg";
//Hooks
import { useState } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/userSlice";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const currentUserUID = useSelector((state) => state.user.currentUserUID);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    if (currentUserUID) {
      dispatch(signOut());
    }
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-indigo-900">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-10 w-10 mr-3" alt="Logo" />
            <span className="self-center text-2xl font-medium whitespace-nowrap hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover:bg-transparent">
              E-Commerce
            </span>
          </Link>
          <div className="w-full md:block md:w-auto ">
            <button
              className="md:hidden hover:text-orange-500"
              onClick={toggleMenu}
            >
              {menuOpen ? <HiX size={32} /> : <HiMenu size={32} />}
            </button>
            <ul
              className={`font-medium  md:flex ${
                menuOpen ? "block" : "hidden"
              } flex flex-col items-center text-4xl p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:text-3xl`}
            >
              <li>
                <Link
                  to="/shop"
                  className="rounded md:hover:bg-transparent md:border-0 hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover-bg-transparent"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="rounded md:hover:bg-transparent md:border-0 hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover-bg-transparent"
                >
                  Contact
                </Link>
              </li>
              {currentUserUID ? (
                <li>
                  <Link
                    to="/signin"
                    className="rounded md:hover:bg-transparent md:border-0 hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover-bg-transparent"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/signin"
                    className="rounded md:hover:bg-transparent md:border-0 hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover-bg-transparent"
                  >
                    Sign In
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/cart"
                  className="rounded md:hover-bg-transparent md:border-0 hover:text-orange-500 md:p-0 dark:text-white md:dark:hover-text-orange-500 dark:hover-text-orange-500 md:dark:hover-bg-transparent"
                >
                  <HiShoppingBag size={42} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
