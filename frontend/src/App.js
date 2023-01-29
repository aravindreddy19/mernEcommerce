import "./App.css";
import Header from "./components/layout/Header/Header.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import webFont from "webfontloader";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import Payment from "./components/Cart/Payment.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
// import ProtectedRoute from "./components/Route/ProtectedRoute";
// import Loader from './components/layout/Loader/Loader';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList.jsx";
import ProcessOrder from "./components/admin/ProcessOrder.jsx";
import UserList from "./components/admin/UserList.jsx";
import UpdateUser from "./components/admin/UpdateUser.jsx";
import ProductReviews from "./components/admin/ProductReviews.jsx";
import About from "./components/layout/about/About";
import Contact from "./components/layout/contact/Contact";
import NotFound from "./components/layout/notFound/NotFound";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                {" "}
                <Payment />{" "}
              </Elements>
            }
          />
        )}

        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/me/update"
          element={
            isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/password/update"
          element={
            isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route
          path="/order/confirm"
          element={
            isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/success"
          element={
            isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/order/:id"
          element={
            isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/dashboard"
          admin={true}
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/products"
          admin={true}
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/product/new"
          element={isAuthenticated ? <NewProduct /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/product/:id"
          admin={true}
          element={
            isAuthenticated ? <UpdateProduct /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/orders"
          admin={true}
          element={isAuthenticated ? <OrderList /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/order/:id"
          admin={true}
          element={
            isAuthenticated ? <ProcessOrder /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/users"
          admin={true}
          element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/user/:id"
          admin={true}
          element={isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/reviews"
          admin={true}
          element={
            isAuthenticated ? <ProductReviews /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
