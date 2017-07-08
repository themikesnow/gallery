import React, { Component } from 'react';

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
    onSearch: React.PropTypes.func.isRequired,
    onPreviousImage: React.PropTypes.func.isRequired,
    onNextImage: React.PropTypes.func.isRequired,
    onSelectImage: React.PropTypes.func.isRequired,
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

  render() {
    return (
      <div className="gallery">
        <div className="col-centered REVIEW">
          <SearchInput
            onSearch={this.props.onSearch}
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
                  onPreviousImage={this.props.onPreviousImage}
                  onNextImage={this.props.onNextImage}
                />
                <div className="images">
                  {this.props.images.map((i, index) => (
                    <Image
                      id={`image-${index}`}
                      key={index} // eslint-disable-line react/no-array-index-key
                      image={i}
                      index={index}
                      isActive={this.props.selectedImage === index}
                      onSelectImage={this.props.onSelectImage}
                    />
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
