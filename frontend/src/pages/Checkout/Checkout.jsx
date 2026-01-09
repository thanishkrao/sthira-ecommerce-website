import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'COD',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          price: item.discount > 0
            ? item.price * (1 - item.discount / 100)
            : item.price,
          product: item._id,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const { data } = await ordersAPI.create(orderData);
      clearCart();
      navigate(`/order-success/${data.order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>
            <p>Add some items to proceed with checkout.</p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        {!isAuthenticated && (
          <div className="checkout-login-prompt">
            <p>Already have an account?</p>
            <Link to="/login?redirect=checkout" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        )}

        {error && <div className="checkout-error">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-layout">
          {/* Shipping Info */}
          <div className="checkout-form">
            <section className="checkout-section">
              <h2 className="section-heading">Shipping Address</h2>

              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="City"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-input form-select"
                  required
                >
                  <option value="India">India</option>
                </select>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="section-heading">Payment Method</h2>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-title">Cash on Delivery</span>
                    <span className="payment-option-desc">Pay when you receive</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={formData.paymentMethod === 'Card'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-title">Credit/Debit Card</span>
                    <span className="payment-option-desc">Pay securely online</span>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={formData.paymentMethod === 'UPI'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-title">UPI</span>
                    <span className="payment-option-desc">Pay with UPI apps</span>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="summary-item">
                  <div className="summary-item-image">
                    <img
                      src={item.image.startsWith('http') ? item.image : `/uploads/${item.image}`}
                      alt={item.name}
                    />
                    <span className="summary-item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-details">Size: {item.size}</p>
                  </div>
                  <p className="summary-item-price">
                    ₹{((item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-full"
              disabled={loading || !isAuthenticated}
            >
              {loading ? 'Processing...' : isAuthenticated ? 'Place Order' : 'Sign in to Order'}
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
