import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
class Dimmer extends PureComponent {

    static propTypes = {
        active: PropTypes.bool
    }
    render() {
        const {active} = this.props;
        return (
            <div className={`Dimmer ${active ? "active" : ""}`}>
                {this.props.children}
            </div>
        )
    }
}

export default Dimmer
