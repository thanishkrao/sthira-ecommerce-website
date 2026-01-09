import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { ordersAPI } from '../../services/api';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await ordersAPI.getById(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <FiCheck size={48} />
          </div>

          <h1 className="success-title">Thank you for your order!</h1>
          <p className="success-subtitle">
            Your order has been placed successfully.
          </p>

          {order && (
            <div className="order-info">
              <p className="order-id">Order ID: <strong>{order._id}</strong></p>
              <p className="order-status">Status: <span className="status-badge">{order.orderStatus}</span></p>
            </div>
          )}

          <div className="success-message">
            <p>We've sent a confirmation email with your order details.</p>
            <p>You can track your order status in your account.</p>
          </div>

          <div className="success-actions">
            <Link to="/orders" className="btn btn-primary">
              View My Orders
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
