import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=profile');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await ordersAPI.getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="profile-page">
      <div className="container">
        <h1 className="profile-title">My Account</h1>

        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-user">
              <div className="profile-avatar">
                <FiUser size={32} />
              </div>
              <div className="profile-user-info">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <nav className="profile-nav">
              <Link to="/profile" className="profile-nav-link active">
                <FiPackage /> My Orders
              </Link>
              <button onClick={handleLogout} className="profile-nav-link logout-btn">
                <FiLogOut /> Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="profile-content">
            <h2 className="content-title">Order History</h2>

            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div>
                        <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                        <p className="order-date">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="order-status-section">
                        <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>

                    <div className="order-items-preview">
                      {order.orderItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="order-item-preview">
                          <span>{item.name}</span>
                          <span>×{item.qty}</span>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <p className="order-more">+{order.orderItems.length - 3} more items</p>
                      )}
                    </div>

                    <div className="order-footer">
                      <p className="order-total">Total: ₹{order.totalPrice.toFixed(2)}</p>
                      <Link to={`/orders/${order._id}`} className="btn btn-secondary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="orders-empty">
                <FiPackage size={48} />
                <h3>No orders yet</h3>
                <p>When you place an order, it will appear here.</p>
                <Link to="/products" className="btn btn-primary">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
