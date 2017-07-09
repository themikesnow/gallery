import React from 'react';
import classnames from 'classnames';

import Loading from '../Loading/Loading.react';

export default class SearchInput extends React.Component {

  static propTypes = {
    isBusy: React.PropTypes.bool,
    onSearch: React.PropTypes.func,
  };

  static defaultProps = {
    isBusy: false,
    onSearch: () => {},
  };

  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
    this.onClick = ::this.onClick;
    this.onKeyPressed = ::this.onKeyPressed;
    this.onSearch = ::this.onSearch;
  }

  state = {
    value: '',
  };

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onClick() {
    this.onSearch();
  }

  onKeyPressed(e) {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    if (!this.props.isBusy && typeof this.props.onSearch === 'function') {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    return (
      <div className="search-input">
        <div className="controls">
          <input
            className="search-input-control"
            type="text"
            value={this.state.value}
            placeholder="Enter keyword..."
            onChange={this.onChange}
            onKeyPress={this.onKeyPressed}
          />
          <button className={classnames({ 'btn btn-submit': true, disabled: this.props.isBusy || !this.state.value })} onClick={this.state.value && this.onClick}>
            {this.props.isBusy ? <Loading isIcon />
              : <span>Search</span>
            }
          </button>
        </div>
      </div>
    );
  }
}
