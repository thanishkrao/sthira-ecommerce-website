import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : null;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, 'M');
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product._id}`} className="product-card-link">
        {/* Image */}
        <div className="product-card-image-wrapper">
          <img
            src={product.image.startsWith('http') ? product.image : `/uploads/${product.image}`}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />

          {/* Badge */}
          {product.discount > 0 && (
            <span className="product-card-badge product-card-badge-sale">
              -{product.discount}%
            </span>
          )}

          {product.stock === 0 && (
            <span className="product-card-badge product-card-badge-soldout">
              Sold Out
            </span>
          )}

          {/* Quick Actions */}
          <div className={`product-card-actions ${isHovered ? 'visible' : ''}`}>
            <button className="product-card-action-btn" aria-label="Add to wishlist">
              <FiHeart size={18} />
            </button>
            <button
              className="product-card-action-btn product-card-add-btn"
              onClick={handleQuickAdd}
              disabled={product.stock === 0}
              aria-label="Quick add to cart"
            >
              <FiShoppingBag size={18} />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="product-card-info">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-category">{product.category}</p>
          <div className="product-card-price">
            {discountedPrice ? (
              <>
                <span className="product-card-price-sale">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                <span className="product-card-price-original">
                  ₹{product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span>₹{product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
