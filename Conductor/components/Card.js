import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css';
export class Card extends Component {
    static propTypes = {
        item: PropTypes.object
    }
    render() {
        return (
            <div className="Card">
                <span>{this.props.item.name}</span>
                <span>TYPE : {this.props.item.type}</span>
            </div>
        )
    }
}

export default Card;
