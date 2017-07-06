import React from 'react';
import classnames from 'classnames';

import GalleryActionCreators from '../../actions/GalleryActionCreators';

import ImageProps from '../../constants/PropTypes';

export default class Image extends React.Component {

  static propTypes = {
    image: React.PropTypes.shape(ImageProps).isRequired,
    index: React.PropTypes.number,
    isActive: React.PropTypes.bool.isRequired,
  };

  static defaultProps = {
    index: 0,
  };

  componentWillReceiveProps(nextProps) {    
    if (nextProps.isActive && (this.image && typeof this.image.scrollIntoView === 'function')) {
      this.image.scrollIntoView();  // Need to find a way to test this...
    }
  }

  render() {
    return (
      <div ref={(c) => { this.image = c; }} className={classnames({ image: true, active: this.props.isActive })} onClick={() => { GalleryActionCreators.setSelectedImage(this.props.index); }}>
        <img alt="Thumbnail" src={this.props.image.thumbnail} />
      </div>
    );
  }
}
