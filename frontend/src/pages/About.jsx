import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
// Make sure Bootstrap Icons CSS is included in your index.html or main layout

function About({ mode }) {
  const { colorMode } = mode;

  const textColor = colorMode === 'dark' ? 'text-light' : 'text-dark';
  const bgColor = colorMode === 'dark' ? '#110a0a' : '#f8f9fa';

  const iconStyle = {
    fontSize: '2rem',
    color: colorMode === 'dark' ? '#66b2ff' : '#0d6efd',
    transition: 'transform 0.2s',
  };

  const iconHoverStyle = {
    transform: 'scale(1.1)'
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column align-items-center justify-content-center p-4 ${textColor}`}
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="mb-4">Hey!! 👋</h1>
      <p className="fs-5 text-center" style={{ maxWidth: '700px' }}>
        This is a web app that I made using <strong>React</strong> with a dedicated <strong>Express</strong> backend.
        It allows you to manipulate and translate text in fun and useful ways, including converting to Morse code.
        <br /><br />
        Check out my other projects. Cotact here:
      </p>

      <div className="d-flex gap-4 mt-3 flex-wrap justify-content-center">
        {/* Portfolio link with placeholder logo */}
        <a
          href="https://anantspace.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
          className="d-flex align-items-center"
        >
          {/* Replace below with your own logo when ready */}
          <img
            src="/anant_space_logo.png" // placeholder
            alt="Anant Space"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </a>

        {/* GitHub icon */}
        <a
          href="https://github.com/anantcodes"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
        >
          <i className="bi bi-github"></i>
        </a>

        {/* LinkedIn icon */}
        <a
          href="https://www.linkedin.com/in/anantcodes"
          target="_blank"
          rel="noopener noreferrer"
          style={iconStyle}
        >
          <i className="bi bi-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default About;
