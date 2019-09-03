import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Events} from './events';
import Names from './Names';
import Client from './Client';
import Company from './Company';
import Card from './Card';
import ButtonsSorting from './ButtonsSorting';
import './Mobile.css';
class Mobile extends PureComponent {
    static propTypes = {
        clients: PropTypes.array
    }
    state = {
        clients: this.props.clients,
        currentCompany: 'mts',
        sorting: 'all',
        card: {
            view: undefined,
            client: undefined
        }
    }
    renderClients = () => {
        let clients = this.state.clients.slice();
        let clientsDOM = [];
        clients.forEach(client => {
            if(client.balance < 0) {
                client.state = 'blocked';
            } else {
                client.state = 'active';
            }
            if(this.state.currentCompany == client.company && (this.state.sorting == 'all' || client.state == this.state.sorting)) {
                let element = <Client key={client.id} client={client}></Client>
                clientsDOM.push(element);
            }
        });
        return clientsDOM;
    }
    setCompany = (currentCompany) => {
        this.setState({
            currentCompany 
        });
    }
    setSorting = (sorting) => {
        this.setState({
            sorting
        });
    }
    deleteClient = (id) => {
        let clients = this.state.clients.slice();
        clients = clients.filter((client) => client.id != id);
        this.setState({
            clients
        });
    }
    editClient = (client) => {
        let card = {
            client,
            view: "edit"
        };
        this.setState({
            card
        });
    }
    saveClient = (newClient) => {
        let clients = this.state.clients.slice();
        clients = clients.map((client)=> {
            if(client.id == newClient.id) {
                client = {...newClient};
            }
            return client;
        });
        this.setState({
            clients
        });
    }
    addCard = () => {
        let card = {
            view: 'add',
            client: {
                id: this.renderId(10000)
            }
        }
        this.setState({
            card
        });        
    }
    closeCard = () => {
        let card = {
            view: undefined,
            client: undefined
        }
        this.setState({
            card
        });
    }
    renderId = (max) => {
        let accept,
            id;
        do {
            accept = false;
            id = Math.floor(Math.random()*max + 1);
            for(let i = 0; i < this.state.clients.length; i++) {
                let elem = this.state.clients[i];
                if(elem.id == id) {
                    accept = true;
                    break;
                }
            }
        }while(accept)
        return id;
    }
    addClient = (client) => {
        let clients = this.state.clients.slice();
        clients.push(client);
        this.setState({clients});
    }
    componentDidMount = () => {
        Events.addListener('setCompany',this.setCompany);
        Events.addListener('setSorting',this.setSorting);
        Events.addListener('deleteClient',this.deleteClient);
        Events.addListener('editClient',this.editClient);
        Events.addListener('saveClient',this.saveClient);
        Events.addListener('closeCard',this.closeCard);
        Events.addListener('addClient',this.addClient);
    };
    
    componentWillUnmount = () => {
        Events.removeListener('setCompany',this.setCompany);
        Events.removeListener('setSorting',this.setSorting);
        Events.removeListener('deleteClient',this.deleteClient);
        Events.removeListener('editClient',this.editClient);
        Events.removeListener('saveClient',this.saveClient);
        Events.removeListener('closeCard',this.closeCard);
        Events.removeListener('addClient',this.addClient);;
    };
    render() {
        console.log(`Render Mobile`);
        return (
            <div className="Mobile">
                <Company></Company>
                <ButtonsSorting></ButtonsSorting>
                <div className="clientsTable">
                <Names></Names>
                {this.renderClients()}
                </div>
                {this.state.card.view ? <Card card={this.state.card} key={this.state.card.client.id}></Card> : undefined}
                {!this.state.card.view ? <button className="btn add" onClick={this.addCard}>Add new client...</button> : undefined}
            </div>
        )
    }
}

export default Mobile
