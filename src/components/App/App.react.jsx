import React from 'react';
import Navbar from '../Navbar/Navbar.react';
import GallerySection from '../Gallery/GallerySection.react';

function getStateFromStores() {
  return {
  };
}

class App extends React.Component {
  static propTypes = {
  };

  state = getStateFromStores();

  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="main">
          <GallerySection />
        </div>
      </div>
    );
  }
}
export default App;
