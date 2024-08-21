import { Navigate, Route, Routes } from "react-router-dom"

// Components
import NavBar from "./routes/components/NavBar";
import {Footer} from "./routes/components/Footer";

// Pages
import { Home } from "./routes/pages/Home"

import { CheckoutPage } from "./routes/pages/CheckoutPage"
import { ConfirmedPurchase } from "./routes/pages/ConfirmedPurchase";
import { SignUp } from "./routes/pages/SignUp"
import { Login } from "./routes/pages/Login"
import Test from "./routes/pages/Test"
import Products from "./routes/pages/Products"
import ShoppingCart from "./routes/pages/ShoppingCart"
import Favorite from "./routes/pages/Favorite";

import UserProfile from "./routes/pages/UserProfile"
import UserAddress from "./routes/pages/UserAddress"

import ProductDetail from "./routes/pages/ProductDetail";

//Providers
import { UserProvider } from "./routes/context/UserProvider"
import { ProductProvider } from "./routes/context/ProductProvider"
import { CartProvider } from "./routes/context/CartContext";
import { Admin } from "./routes/pages/Admin";
import { AdminAdvertising } from "./routes/pages/AdminAdvertising";



export const App = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>

          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-advertising" element={<AdminAdvertising />} />
            <Route path="/confirmed-purchase" element={<ConfirmedPurchase />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/products" element={<Products />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/address" element={<UserAddress />} />
            <Route path="/address/:id" element={<UserAddress />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/favorite" element={<Favorite />} />


            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>

          <Footer/>

        </CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}

