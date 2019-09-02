import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {voteEvents} from './events';
import Names from './Names';
import Client from './Client';
import Company from './Company';
import Card from './Card';
class Mobile extends PureComponent {
    static propTypes = {
        clients: PropTypes.array
    }
    state = {
        company: "mts",
        clients: this.props.clients,
        cardClient: this.props.clients[0],
        cardView: 'edit'
    }
    renderClients = () => {
        let clients = this.state.clients.slice();
        let clientsDOM = [];
        clients.forEach(client => {
            if(client.company == this.state.company) {
                let element = <Client key={client.id} client={client}></Client>
                clientsDOM.push(element);
            }
        });
        return clientsDOM;
    }
    setCompany = (company) => {
        this.setState({
            company
        });
    }
    deleteClient = (id) => {
        let clients = this.state.clients.slice();
        let clientsDOM = [];
        clients = clients.filter(client => {
            return client.id != id;
        });
        this.setState({
            clients
        });
    }
    editClient = (client) => {
        this.setState({
            cardView: "edit",
            cardClient: client
        });
    }
    componentDidMount = () => {
        voteEvents.addListener('changeCompany', this.setCompany);
        voteEvents.addListener('deleteClient', this.deleteClient);
        voteEvents.addListener('editClient', this.editClient);
      };
    
      componentWillUnmount = () => {
        voteEvents.removeListener('changeCompany',this.setCompany);
        voteEvents.removeListener('deleteClient', this.deleteClient);
        voteEvents.removeListener('editClient', this.editClient);
    };
    render() {
        console.log(`Render Mobile`);
        return (
            <div className="Mobile">
                <Company></Company>
                <Names clients={this.props.clients}></Names>
                {this.renderClients()}
                {(this.state.cardView ? <Card key={this.state.cardClient.id} client = {this.state.cardClient}></Card> : undefined)}
            </div>
        )
    }
}

export default Mobile
