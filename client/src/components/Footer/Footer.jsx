import React from 'react';
import './Footer.css'; // Import the CSS file
 
function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© 2024 Academian. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
}
 
export default Footer;