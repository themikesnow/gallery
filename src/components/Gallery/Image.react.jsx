import React from 'react';
import classnames from 'classnames';
import ImageProps from '../../constants/PropTypes';

export default class Image extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    image: React.PropTypes.shape(ImageProps).isRequired,
    index: React.PropTypes.number,
    isActive: React.PropTypes.bool.isRequired,
    onSelectImage: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    index: 0,
  };

  constructor(props) {
    super(props);
    this.onSelectImage = ::this.onSelectImage;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && (this.image && typeof this.image.scrollIntoView === 'function')) {
      this.image.scrollIntoView();  // Need to find a way to test this...
    }
  }

  onSelectImage() {
    this.props.onSelectImage(this.props.index);
  }

  render() {
    return (
      <div id={this.props.id} ref={(c) => { this.image = c; }} className={classnames({ image: true, active: this.props.isActive })} onClick={this.onSelectImage}>
        <img alt="Thumbnail" src={this.props.image.thumbnail} />
      </div>
    );
  }
}
