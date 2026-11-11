import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-4">
      {/* Hero Header */}
      <div className="about-hero">
        <span className="about-badge">
          <i className="fa-solid fa-circle-nodes me-1"></i> About RoomEase
        </span>
        <h1 className="about-headline">
          Revolutionizing How You <span>Manage & Share</span> Living Spaces
        </h1>
        <p className="about-lead">
          RoomEase provides a streamlined, secure platform to publish, organize, and find room accommodations effortlessly.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="row g-4 my-2">
        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon-box icon-blue">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h4 className="feature-title">Instant Room Listing</h4>
            <p className="feature-desc">
              List new accommodations in seconds. Specify titles, amenities, contact details, and locations with zero hassle.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon-box icon-purple">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <h4 className="feature-title">Real-time Management</h4>
            <p className="feature-desc">
              Edit pricing, locations, and descriptions on the fly, or quickly remove listings that are no longer available.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card">
            <div className="feature-icon-box icon-emerald">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h4 className="feature-title">Secure & Personalized</h4>
            <p className="feature-desc">
              Your account and listings are kept safe with authenticated token verification so only you can manage your rooms.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights / Mission Box */}
      <div className="hero-banner my-5 text-center">
        <h3 className="fw-bold mb-3">Ready to manage your room listings?</h3>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Whether you have a spare room, a student dorm, or an apartment to share, RoomEase is built to help you keep everything in order.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn btn-nav-primary">
            <i className="fa-solid fa-arrow-left me-1"></i> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
