import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { productsAPI } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  const categories = ['women', 'men', 'kids', 'accessories'];
  const sortOptions = [
    { value: '', label: 'Featured' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await productsAPI.getAll({ category, sort });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = category || sort;

  return (
    <main className="products-page">
      <div className="container">
        {/* Header */}
        <div className="products-header">
          <div className="products-title-section">
            <h1 className="products-title">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
            </h1>
            <p className="products-count">{products.length} items</p>
          </div>

          <div className="products-controls">
            {/* Mobile Filter Toggle */}
            <button
              className="filter-toggle-btn"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FiFilter size={18} />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="sort-dropdown">
              <select
                value={sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="sort-icon" />
            </div>
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`products-sidebar ${filterOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <button
                className="sidebar-close"
                onClick={() => setFilterOpen(false)}
              >
                <FiX size={24} />
              </button>
            </div>

            {hasFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            )}

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Category</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={category === ''}
                    onChange={() => updateFilter('category', '')}
                  />
                  <span>All</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => updateFilter('category', cat)}
                    />
                    <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or check back later.</p>
                {hasFilters && (
                  <button className="btn btn-secondary" onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile filter */}
      {filterOpen && (
        <div className="filter-overlay" onClick={() => setFilterOpen(false)} />
      )}
    </main>
  );
};

export default Products;
