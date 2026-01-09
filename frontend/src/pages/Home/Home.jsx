import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { productsAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsAPI.getAll();
        setFeaturedProducts(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600', path: '/products?category=women' },
    { name: 'Men', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600', path: '/products?category=men' },
    { name: 'Kids', image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600', path: '/products?category=kids' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600', path: '/products?category=accessories' },
  ];

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">New Collection</span>
          <h1 className="hero-title">Style Meets Comfort</h1>
          <p className="hero-subtitle">
            Discover the latest trends in fashion. Quality clothing for everyone.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link to="/products?category=women" className="btn btn-secondary btn-lg">
              Explore Women
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            alt="Fashion collection"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((cat) => (
              <Link key={cat.name} to={cat.path} className="category-card">
                <div className="category-image">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <div className="category-overlay">
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="category-link">
                    Shop Now <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <Link to="/products" className="section-link">
              View All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <span className="promo-tag">Limited Time</span>
          <h2 className="promo-title">Up to 50% Off</h2>
          <p className="promo-text">Seasonal sale on selected items</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Shop Sale
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className="feature-title">Free Shipping</h3>
              <p className="feature-text">On orders over ₹2000</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3 className="feature-title">Easy Returns</h3>
              <p className="feature-text">30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-text">100% secure checkout</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-text">Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
