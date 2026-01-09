import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { productsAPI } from '../../services/api';
import AdminLayout from './AdminLayout';
import './Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productsAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Products</h1>
          <Link to="/admin/products/new" className="btn btn-primary">
            <FiPlus size={18} />
            Add Product
          </Link>
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
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="table-product">
                          <img
                            src={product.image.startsWith('http') ? product.image : `/uploads/${product.image}`}
                            alt={product.name}
                            className="table-product-image"
                          />
                          <span className="table-product-name">{product.name}</span>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                      <td>₹{product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/admin/products/edit/${product._id}`} className="btn-icon">
                            <FiEdit2 size={16} />
                          </Link>
                          <button
                            className="btn-icon delete"
                            onClick={() => handleDelete(product._id)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                      No products found. <Link to="/admin/products/new">Add your first product</Link>
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

export default AdminProducts;
