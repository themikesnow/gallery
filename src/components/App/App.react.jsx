import React from 'react';
import Navbar from '../Navbar/Navbar.react';
import GallerySectionContainer from '../Gallery/GallerySection.react';

const App = () => (
  <div className="app">
    <Navbar />
    <div className="main">
      <GallerySectionContainer />
    </div>
  </div>
);

export default App;
