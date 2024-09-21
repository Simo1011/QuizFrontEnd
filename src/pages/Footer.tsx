import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social icons

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container className="text-center">
        <span>© 2024 Quiz App. All Rights Reserved.</span>
        <div className="mt-2">
          {/* Social media icons */}
          <a href="https://facebook.com" className="text-white mx-2">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com/skma1011" className="text-white mx-2">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com/simo_rizo" className="text-white mx-2">
            <FaInstagram size={24} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
