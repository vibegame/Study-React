import React from 'react';
import PropTypes from 'prop-types';

class Frame extends React.Component {
  render() {
    return (
        <h3 style={{padding: "50px 200px"}}>{this.props.children}</h3>
    );
  }
}

export default Frame;