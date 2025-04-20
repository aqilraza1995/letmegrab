import { lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AddEditProduct from "./pages/Product/AddEditProduct";
// import Navbar from "./components/Navbar";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Navbar = lazy(() => import("./components/Navbar"));

const PrivateRoutes = () => {
  const auth =
    localStorage.getItem("authUser") !== null
      ? JSON.parse(localStorage.getItem("authUser") || "")
      : null;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/product" element={<Product />} />
          <Route path="/add-product" element={<AddEditProduct />} />
          <Route path="/edit-product/:id" element={<AddEditProduct />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </>
  )
}

export default App
