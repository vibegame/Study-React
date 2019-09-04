import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {voteEvents, Events} from './events';
import './Client.css';
class Client extends PureComponent {
    static PropTypes = {
        client: PropTypes.object
    }
    deleteClient = () => {
        let answer = confirm(`Вы уверены, что хотите удалить ${this.props.client.name} ${this.props.client.surname}`);
        if(answer) {
            Events.emit("deleteClient", this.props.client.id);
        }
    }
    editClient = () => {
        Events.emit("editClient", this.props.client);
    }
    render() {
        console.log(`Render Client Name: ${this.props.client.name}`);
        return (
            <div className="Client">
                <span>{this.props.client.name}</span>
                <span>{this.props.client.surname}</span>
                <span>{this.props.client.age}</span>
                <span>{this.props.client.balance}</span>
                <span className={`state ${this.props.client.state}`}>{this.props.client.state}</span>
                <span className="actions">
                    <button className="delete btn" onClick={this.deleteClient}>Delete</button>
                    <button className="edit btn" onClick={this.editClient}>Edit</button>
                </span>
            </div>
        )
    }
}
export default Client
