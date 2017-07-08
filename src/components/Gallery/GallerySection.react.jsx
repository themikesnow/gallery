import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedImage, search, goToPreviousImage, goToNextImage, fetchMoreImagesIfNeeded } from '../../actions';
import Gallery from './Gallery.react';
import ImageProps from '../../constants/PropTypes';


export class GallerySection extends Component {

  static propTypes = {
    images: React.PropTypes.arrayOf(React.PropTypes.shape(ImageProps)),
    selectedImage: React.PropTypes.number,
    isPreviousEnabled: React.PropTypes.bool,
    isNextEnabled: React.PropTypes.bool,
    isBusy: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    isBusy: false,
    images: null,
    selectedImage: 0,
    isPreviousEnabled: false,
    isNextEnabled: false,
  };

  constructor(props) {
    super(props);
    this.onSelectImage = ::this.onSelectImage;
    this.onSearch = ::this.onSearch;
    this.onPreviousImage = ::this.onPreviousImage;
    this.onNextImage = ::this.onNextImage;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedImage !== this.props.selectedImage) {
      const { dispatch } = nextProps;
      dispatch(fetchMoreImagesIfNeeded());
    }
  }

  onSelectImage(image) {
    const { dispatch } = this.props;
    dispatch(setSelectedImage(image));
  }

  onSearch(text) {
    this.props.dispatch(search(text));
  }

  onPreviousImage() {
    this.props.dispatch(goToPreviousImage());
  }

  onNextImage() {
    this.props.dispatch(goToNextImage());
  }

  render() {
    return (
      <div className="gallery-section">
        <Gallery
          images={this.props.images}
          selectedImage={this.props.selectedImage}
          isPreviousEnabled={this.props.isPreviousEnabled}
          isNextEnabled={this.props.isNextEnabled}
          isBusy={this.props.isBusy}
          onSelectImage={this.onSelectImage}
          onSearch={this.onSearch}
          onNextImage={this.onNextImage}
          onPreviousImage={this.onPreviousImage}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { isBusy, images, selectedImage, isPreviousEnabled, isNextEnabled, searchText } = state;

  return {
    isBusy,
    images,
    selectedImage,
    isPreviousEnabled,
    isNextEnabled,
    searchText,
  };
};

export default connect(mapStateToProps)(GallerySection);
