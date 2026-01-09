import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import { productsAPI, ordersAPI } from '../../services/api';
import AdminLayout from './AdminLayout';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productsAPI.getAll(),
          ordersAPI.getAll(),
        ]);

        const orders = ordersRes.data;
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        setStats({
          products: productsRes.data.length,
          orders: orders.length,
          revenue: totalRevenue,
        });

        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FiPackage size={24} />
            </div>
            <div className="stat-value">{stats.products}</div>
            <div className="stat-label">Total Products</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiShoppingBag size={24} />
            </div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-label">Total Orders</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiDollarSign size={24} />
            </div>
            <div className="stat-value">₹{stats.revenue.toLocaleString()}</div>
            <div className="stat-label">Total Revenue</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers size={24} />
            </div>
            <div className="stat-value">--</div>
            <div className="stat-label">Total Customers</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="admin-page-header">
          <h2 className="admin-page-title" style={{ fontSize: 'var(--text-lg)' }}>Recent Orders</h2>
          <Link to="/admin/orders" className="btn btn-secondary">View All</Link>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-8).toUpperCase()}</td>
                      <td>{order.user?.name || 'Guest'}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>₹{order.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
