import { Routes, Route } from "react-router-dom"
import UserHome from "./pages/userHome"
import AdminLogin from "./pages/adminLogin"
import AdminHome from "./pages/adminHome"
import ProductDetail from "./pages/ProductDetail"
import Products from "./pages/Products"
import SearchResults from "./pages/SearchResults"
import ContactUs from "./pages/ContactUs"
import ProtectedRoute from "./components/ProtectedRoute"
import ScrollToTop from "./components/ScrollToTop"


const App = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                    <AdminHome />
                </ProtectedRoute>
            } />
        </Routes>
        </>
    )
}

export default App;


