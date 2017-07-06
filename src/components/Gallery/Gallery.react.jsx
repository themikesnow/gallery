import React, { Component } from 'react';

import GalleryActionCreators from '../../actions/GalleryActionCreators';
import SearchInput from '../SearchInput/SearchInput.react';
import Image from './Image.react';
import Slider from './Slider.react';
import ImageProps from '../../constants/PropTypes';

export default class Gallery extends Component {
  static propTypes = {
    images: React.PropTypes.arrayOf(React.PropTypes.shape(ImageProps)),
    selectedImage: React.PropTypes.number,
    isPreviousEnabled: React.PropTypes.bool,
    isNextEnabled: React.PropTypes.bool,
    isBusy: React.PropTypes.bool,
  };

  static defaultProps = {
    images: null,
    selectedImage: 0,
    isPreviousEnabled: false,
    isNextEnabled: false,
  };

  static defaultProps = {
    isBusy: false,
  };

  onSearch(text) {
    GalleryActionCreators.search(text);
  }

  render() {
    return (
      <div className="gallery">
        <div className="col-centered REVIEW">
          <SearchInput
            onSearch={this.onSearch}
            isBusy={this.props.isBusy}
          />
        </div>

        {this.props.images &&
          <div>
            {this.props.images.length > 0 ?
              <div>
                <Slider
                  image={this.props.images[this.props.selectedImage]}
                  isPreviousEnabled={this.props.isPreviousEnabled}
                  isNextEnabled={this.props.isNextEnabled}
                />
                <div className="images">
                  {this.props.images.map((i, index) => ( // eslint-disable-next-line react/no-array-index-key
                    <Image key={index} image={i} index={index} isActive={this.props.selectedImage === index} />
                  ))}
                </div>
              </div>
            : <div className="alert">
                No Images found...
              </div>
            }
          </div>
        }
      </div>
    );
  }
}
