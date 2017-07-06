import React from 'react';

const Loading = (props) => {
  if (props.isIcon) {
    return (
      <i className="fa fa-refresh fa-spin fa-lg fa-fw" />
    );
  }

  return (
    <div className="loading">
      <i className="fa fa-refresh fa-spin fa-3x fa-fw" />
    </div>
  );
};

Loading.propTypes = {
  isIcon: React.PropTypes.bool,
};

Loading.defaultProps = {
  isIcon: false,
};

export default Loading;
