import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Names.css';
class Names extends PureComponent {
    static propTypes = {
        clients: PropTypes.array
    }
    render() {
        return (
            <div className="Names">
                <span>Name</span>
                <span>Surname</span>
                <span>Age</span>
                <span>Balance</span>
                <span>Status</span>
                <span className="actions">Actions</span>
            </div>
        )
    }
}

export default Names
