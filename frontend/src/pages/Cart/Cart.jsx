import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <FiShoppingBag size={64} className="cart-empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-count">{cartItems.length} items</p>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const itemPrice = item.discount > 0
                ? item.price * (1 - item.discount / 100)
                : item.price;

              return (
                <article key={`${item._id}-${item.size}-${item.color}`} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={item.image.startsWith('http') ? item.image : `/uploads/${item.image}`}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/products/${item._id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <div className="cart-item-meta">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <div className="cart-item-price">
                      ₹{itemPrice.toFixed(2)}
                      {item.discount > 0 && (
                        <span className="cart-item-original-price">
                          ₹{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="quantity-btn"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      ₹{(itemPrice * item.quantity).toFixed(2)}
                    </div>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(item._id, item.size, item.color)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </article>
              );
            })}

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <aside className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>

            {shipping > 0 && (
              <p className="shipping-note">
                Add ₹{(2000 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-lg btn-full">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
