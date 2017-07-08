import React, { Component } from 'react';
import classnames from 'classnames';
import Loading from '../Loading/Loading.react';
import ImageProps from '../../constants/PropTypes';

export default class Slider extends Component {

  static propTypes = {
    image: React.PropTypes.shape(ImageProps),
    isPreviousEnabled: React.PropTypes.bool,
    isNextEnabled: React.PropTypes.bool,
    onPreviousImage: React.PropTypes.func.isRequired,
    onNextImage: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    image: null,
    isPreviousEnabled: false,
    isNextEnabled: false,
  };

  constructor(props) {
    super(props);
    this.onLoad = ::this.onLoad;
  }

  state = {
    isLoading: true,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.image !== nextProps.image) {
      this.setState({ isLoading: true });
    }
  }

  onLoad() {
    setTimeout(() => { // Added delay to make sure loading component is displayed...
      this.setState({ isLoading: false });
    }, 500);
  }

  render() {
    if (!this.props.image) {
      return <span />;
    }

    return (
      <div className="slider">
        <button className={classnames({ 'btn btn-previous': true, disabled: !this.props.isPreviousEnabled })} onClick={this.props.onPreviousImage}>
          Previuos
        </button>
        <button className={classnames({ 'btn btn-next': true, disabled: !this.props.isNextEnabled })} onClick={this.props.onNextImage}>
          Next
        </button>

        {this.state.isLoading && this.props.image.src && <Loading />}
        {this.props.image.src ?
          <img
            alt="Slider"
            src={this.props.image.src}
            onLoad={this.onLoad}
            className={classnames({ hidden: this.state.isLoading })}
          />
          :
          <div className="image-not-found">
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            <p className="text">Unable to load image...</p>
          </div>
        }
      </div>
    );
  }
}
