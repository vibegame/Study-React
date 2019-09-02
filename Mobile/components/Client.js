import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {voteEvents} from './events';
import './Client.css';
class Client extends PureComponent {
    static PropTypes = {
        client: PropTypes.object
    }
    deleteClient = () => {
        let answer = confirm(`Do you want to delete ${this.props.client.name} ${this.props.client.surname}?`);
        if(answer)
            voteEvents.emit("deleteClient", this.props.client.id);
    }
    editClient = () => {
        voteEvents.emit("editClient", this.props.client);
    }
    render() {
        console.log(`Render Client ID: ${this.props.client.name}`);
        return (
            <div className="Client">
                <span>{this.props.client.name}</span>
                <span>{this.props.client.surname}</span>
                <span>{this.props.client.age}</span>
                <span>{this.props.client.balance}</span>
                <span className={`${(this.props.client.balance < 0) ? "blocked" : ""} status`}>{`${(this.props.client.balance < 0) ? "blocked" : "active"}`}</span>
                <span className="actions">
                    <button className="btn edit" onClick={this.editClient}>Edit</button>
                    <button className="btn delete" onClick={this.deleteClient}>Delete</button>
                </span>
            </div>
        )
    }
}
export default Client
