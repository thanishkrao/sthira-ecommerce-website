import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiHeart, FiChevronLeft } from 'react-icons/fi';
import { productsAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productsAPI.getById(id);
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  const discountedPrice = product?.discount > 0
    ? product.price * (1 - product.discount / 100)
    : null;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back
        </button>

        <div className="product-detail-grid">
          {/* Image */}
          <div className="product-image-section">
            <div className="product-main-image">
              <img
                src={product.image.startsWith('http') ? product.image : `/uploads/${product.image}`}
                alt={product.name}
              />
              {product.discount > 0 && (
                <span className="product-badge">-{product.discount}%</span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="product-info-section">
            <div className="product-info-header">
              <h1 className="product-name">{product.name}</h1>
              <div className="product-price-section">
                {discountedPrice ? (
                  <>
                    <span className="product-price-current">₹{discountedPrice.toFixed(2)}</span>
                    <span className="product-price-original">₹{product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="product-price-current">₹{product.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-option">
                <label className="option-label">Size</label>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-option">
                <label className="option-label">Color: {selectedColor}</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-option">
              <label className="option-label">Quantity</label>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <FiPlus />
                </button>
              </div>
              {product.stock < 10 && product.stock > 0 && (
                <p className="stock-warning">Only {product.stock} left in stock</p>
              )}
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button
                className="btn btn-primary btn-lg btn-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="btn btn-secondary wishlist-btn">
                <FiHeart size={20} />
              </button>
            </div>

            {/* Extra Info */}
            <div className="product-extra-info">
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className={`info-value ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
