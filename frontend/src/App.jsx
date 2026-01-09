import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductForm from './pages/Admin/AdminProductForm';
import AdminOrders from './pages/Admin/AdminOrders';

// Toast Notification Component
import { useCart } from './context/CartContext';

const ToastNotification = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${notification.type}`}>
        {notification.message}
      </div>
    </div>
  );
};

// App Layout with Header and Footer (for non-admin pages)
const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ToastNotification />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Admin Routes (no header/footer) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/new" element={<AdminProductForm />} />
            <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
            <Route path="/admin/orders" element={<AdminOrders />} />

            {/* Public Routes (with header/footer) */}
            <Route path="/" element={<AppLayout><Home /></AppLayout>} />
            <Route path="/products" element={<AppLayout><Products /></AppLayout>} />
            <Route path="/products/:id" element={<AppLayout><ProductDetail /></AppLayout>} />
            <Route path="/cart" element={<AppLayout><Cart /></AppLayout>} />
            <Route path="/checkout" element={<AppLayout><Checkout /></AppLayout>} />
            <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
            <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
            <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
            <Route path="/orders" element={<AppLayout><Profile /></AppLayout>} />
            <Route path="/order-success/:id" element={<AppLayout><OrderSuccess /></AppLayout>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
