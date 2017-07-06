import React, { Component } from 'react';

import GalleryStore from '../../stores/GalleryStore';
import Gallery from './Gallery.react';

function getStateFromStores() {
  return {
    images: GalleryStore.getImages(),
    selectedImage: GalleryStore.getSelectedImage(),
    isPreviousEnabled: GalleryStore.isPreviousEnabled(),
    isNextEnabled: GalleryStore.isNextEnabled(),
    isBusy: GalleryStore.isBusy(),
  };
}

export default class GallerySection extends Component {

  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
  }

  state = getStateFromStores();

  componentDidMount() {
    GalleryStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GalleryStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getStateFromStores());
  }

  render() {
    return (
      <div className="gallery-section">
        <Gallery
          images={this.state.images}
          selectedImage={this.state.selectedImage}
          isPreviousEnabled={this.state.isPreviousEnabled}
          isNextEnabled={this.state.isNextEnabled}
          isBusy={this.state.isBusy}
        />
      </div>
    );
  }
}
