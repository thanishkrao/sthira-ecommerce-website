import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        localStorage.removeItem('cartItems');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product, quantity = 1, size = 'M', color = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item._id === product._id && item.size === size && item.color === color
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        showNotification(`Updated ${product.name} quantity in cart`);
        return updated;
      }

      showNotification(`Added ${product.name} to cart`);
      return [...prev, {
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        image: product.image,
        quantity,
        size,
        color,
        stock: product.stock,
      }];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prev) => {
      const item = prev.find(
        (item) => item._id === productId && item.size === size && item.color === color
      );
      if (item) {
        showNotification(`Removed ${item.name} from cart`);
      }
      return prev.filter(
        (item) => !(item._id === productId && item.size === size && item.color === color)
      );
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount > 0
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    notification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
