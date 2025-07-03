import React from 'react';
import { assets } from '../../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        
        <div className="footer-left">
          <img className='logo-bottom' src={assets.logo_bottom} alt="Logo" />
          <p>
           FoodPrep brings you delicious meals from a curated menu, crafted to satisfy every craving.
Order with ease, track in real-time, and enjoy a seamless dining experience from start to finish.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-section">
          <h2>Company</h2>
          <li>Home</li>
          <li>About Us</li>
          <li>Courses</li>
          <li>Reviews</li>
        </div>

        <div className="footer-section">
          <h2>Explore</h2>
          <li>Menu</li>
          <li>My Orders</li>
          <li>Login</li>
          <li>Cart</li>
        </div>

        <div className="footer-section">
          <h2>Get in Touch</h2>
          <li>+91 88855 85152</li>
          <li>enquiry@foodprep.in</li>
        </div>

      </div>

      <hr />
      <p className='footer-copyright'>
        © 2024 FoodPrep. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
