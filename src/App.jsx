// Router
import { Routes, Route, Outlet } from "react-router-dom";
//Pages
import Navigation from "./pages/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import SignIn from "./pages/SignIn/SignIn";
import Cart from "./pages/Cart/Cart";
//Pages > CategoryList
import Hats from "./pages/CategoryList/Hats";
import Jackets from "./pages/CategoryList/Jackets";
import Sneakers from "./pages/CategoryList/Sneakers";
import Womens from "./pages/CategoryList/Womens";
import Mens from "./pages/CategoryList/Mens";
//Components
import SignUp from "./components/signUp/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop" element={<Outlet />}>
            <Route path="hats" element={<Hats />} />
            <Route path="jackets" element={<Jackets />} />
            <Route path="sneakers" element={<Sneakers />} />
            <Route path="womens" element={<Womens />} />
            <Route path="mens" element={<Mens />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
