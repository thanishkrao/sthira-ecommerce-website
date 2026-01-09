import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const categories = [
    { name: 'Women', path: '/products?category=women' },
    { name: 'Men', path: '/products?category=men' },
    { name: 'Kids', path: '/products?category=kids' },
    { name: 'Accessories', path: '/products?category=accessories' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      {/* Top announcement bar */}
      <div className="header-announcement">
        <p>Free shipping on orders over ₹2000 | Easy returns within 30 days</p>
      </div>

      {/* Main header */}
      <div className="header-main">
        <div className="container header-content">
          {/* Mobile menu button */}
          <button
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="header-logo">
            STHIRA
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {categories.map((cat) => (
              <Link key={cat.name} to={cat.path} className="header-nav-link">
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Search */}
            <button
              className="header-action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>

            {/* User */}
            <div className="header-user-dropdown">
              <button className="header-action-btn" aria-label="Account">
                <FiUser size={20} />
              </button>
              <div className="header-dropdown-menu">
                {user ? (
                  <>
                    <p className="dropdown-greeting">Hi, {user.firstName}</p>
                    <Link to="/profile" className="dropdown-link">My Account</Link>
                    <Link to="/orders" className="dropdown-link">My Orders</Link>
                    {user.isAdmin && (
                      <Link to="/admin" className="dropdown-link">Admin Panel</Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-link dropdown-logout">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-link">Sign In</Link>
                    <Link to="/register" className="dropdown-link">Register</Link>
                  </>
                )}
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="header-action-btn header-cart-btn">
              <FiShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="header-cart-badge">{getCartCount()}</span>
              )}
            </Link>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="header-search">
            <form onSubmit={handleSearch} className="header-search-form container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="header-search-input"
                autoFocus
              />
              <button type="submit" className="header-search-btn">
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <nav className={`header-mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.path}
            className="header-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {cat.name}
          </Link>
        ))}
        <div className="header-mobile-divider" />
        {user ? (
          <>
            <Link to="/profile" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              My Account
            </Link>
            <Link to="/orders" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              My Orders
            </Link>
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="header-mobile-link">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Sign In
            </Link>
            <Link to="/register" className="header-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
