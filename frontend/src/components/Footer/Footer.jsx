import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Women', path: '/products?category=women' },
      { name: 'Men', path: '/products?category=men' },
      { name: 'Kids', path: '/products?category=kids' },
      { name: 'Accessories', path: '/products?category=accessories' },
    ],
    help: [
      { name: 'Customer Service', path: '#' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns & Exchanges', path: '#' },
      { name: 'Size Guide', path: '#' },
      { name: 'FAQs', path: '#' },
    ],
    about: [
      { name: 'About STHIRA', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Sustainability', path: '#' },
      { name: 'Press', path: '#' },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-newsletter-title">Join the STHIRA Club</h3>
          <p className="footer-newsletter-text">
            Get exclusive offers, early access to new collections, and 10% off your first order.
          </p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-newsletter-input"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          {/* Shop */}
          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="footer-column">
            <h4 className="footer-heading">Help</h4>
            <ul className="footer-links">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="footer-column">
            <h4 className="footer-heading">About</h4>
            <ul className="footer-links">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-logo">STHIRA</div>
          <p className="footer-copyright">
            &copy; {currentYear} STHIRA. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="#" className="footer-legal-link">Privacy Policy</Link>
            <Link to="#" className="footer-legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
