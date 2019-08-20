import React from 'react';
import PropTypes from 'prop-types';

class Frame extends React.Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
  }
  renderFrame = () => {
    let element = <h3 style={{padding: "50px 200px"}}>{this.props.children}</h3>;
    for(let i=0;i<this.props.colors.length;i++) {
      element = <div style={{border: "solid 14px " + this.props.colors[i], padding: "5px"}}>{element}</div>
    }
    return element;
  }
  render() {
    return (
      <div>
        {this.renderFrame()}
      </div>
    );
  }

}

export default Frame;