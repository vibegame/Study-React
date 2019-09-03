import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Events } from './events';
import './Card.css';
class Card extends PureComponent {
    static PropTypes = {
        card: PropTypes.object
    }
    state = {
        card: this.props.card,
        allValidated: false
    }
    _modalMessagesRefs = {}
    _inputRefs = {}
    _validated = {}
    setInputsRefs = (node) => {
        if ( node ) {
            this._validated[node.id] = (this.props.card.view == "edit" ? true : false);
            this._inputRefs[node.id] = node;
        }
    }
    setModalMessagesRefs = (node) => {
        if ( node ) 
        this._modalMessagesRefs[node.getAttribute("data-message")] = node;
    }
    showMessage = (message, type) => {
        message.className = `message ${type}`;
    }
    checkValidation = () => {
        for(let key in this._validated) {
            if(!this._validated[key]) {
                this.setState({
                    allValidated: false
                });
                return false;
            }
        }
        this.setState({
            allValidated: true
        });
        return true;
    }
    validateSurname = (EO) => {
        let thing = 'surname';
        let value = this._inputRefs[thing].value;
        let message = this._modalMessagesRefs[thing];
        if(value.length < 3) {
            this._validated[thing] = false;
            message.innerHTML = "Слишком коротко!";
            this.showMessage(message, "error");
        }
        else if(!/^[A-zА-яЁё]+$/.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Только буквы";
            this.showMessage(message, "error");
        }
        else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Недопустимые символы(ENG)";
            this.showMessage(message, "error");
        } 
        else {
            this._validated[thing] = true;
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        this.checkValidation();
        message.classList.add("active");
    }
    validateBalance = (EO) => {
        let thing = 'balance';
        let value = this._inputRefs['balance'].value;
        let message = this._modalMessagesRefs['balance'];
        if(!value.length) {
            this._validated[thing] = false;
            message.innerHTML = "Пусто!";
            this.showMessage(message, "error");
        }
        else if (!/-?\d+/gm.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Только число!";
            this.showMessage(message, "error");
        } 
        else {
            this._validated[thing] = true;
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        this.checkValidation();
        message.classList.add("active");
    }
    validateName = () => {
        let thing = 'name';
        let value = this._inputRefs['name'].value;
        let message = this._modalMessagesRefs['name'];
        if(value.length < 3) {
            this._validated[thing] = false;
            message.innerHTML = "Слишком коротко!";
            this.showMessage(message, "error");
        }
        else if(!/^[A-zА-яЁё]+$/.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Только буквы";
            this.showMessage(message, "error");
        }
        else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Недопустимые символы(ENG)";
            this.showMessage(message, "error");
        } 
        else {
            this._validated[thing] = true;
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        this.checkValidation();
        message.classList.add("active");
    }
    validateAge = (EO) => {
        let thing = 'age';
        let value = this._inputRefs['age'].value;
        let message = this._modalMessagesRefs['age'];
        if(!value.length) {
            this._validated[thing] = false;
            message.innerHTML = "Пусто!";
            this.showMessage(message, "error");
        }
        else if (!/^\d+$/.test(value)) {
            this._validated[thing] = false;
            message.innerHTML = "Только число!";
            this.showMessage(message, "error");
        } 
        else {
            this._validated[thing] = true;
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        this.checkValidation();
        message.classList.add("active");
    }
    validateCompany = (EO) => {
        let thing = 'company';
        let companies = ['mts', 'a1'];
        let value = this._inputRefs['company'].value.toLowerCase();
        let message = this._modalMessagesRefs['company'];
        let haveCompany = companies.some((elem) => elem == value);
        if(!haveCompany) {
            this._validated[thing] = false;
            message.innerHTML = "Нет такой компании";
            this.showMessage(message, "error");            
        } else {
            this._validated[thing] = true;
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        this.checkValidation();
        message.classList.add("active");
    }
    addClient = () => {
        if(!this.state.allValidated) return false;
        let client = {...this.props.card.client};
        for(let key in this._inputRefs) {
            client[key] = this._inputRefs[key].value;
        }
        Events.emit("addClient", client);
        Events.emit("closeCard");        
    }
    saveClient = () => {
        this.validateBalance();
        this.validateSurname();
        if(!this.state.allValidated) return false;
        let client = {...this.props.card.client};
        for(let key in this._inputRefs) {
            client[key] = this._inputRefs[key].value;
        }
        Events.emit("saveClient", client);
        Events.emit("closeCard");
    }
    cancelCard = () => {
        Events.emit("closeCard");
    }
    renderCard = () => {
        switch(this.state.card.view) {
            case 'edit': return (
                <div>          
                    <label htmlFor="name">
                        Name: <input id="name" type="text" className="readOnly" value={this.props.card.client.name} readOnly/>
                    </label>
                    <label htmlFor="surname">
                        Surname: <input id="surname" type="text" defaultValue={this.props.card.client.surname} onChange={this.validateSurname} ref={this.setInputsRefs}/>
                        <span className="message" data-message="surname" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <label htmlFor="age">
                        Age: <input id="age" type="text" className="readOnly" value={this.props.card.client.age} readOnly/>
                    </label>
                    <label htmlFor="company">
                        Company: <input id="company" type="text" className="readOnly" value={this.props.card.client.company} readOnly/>
                    </label>
                    <label htmlFor="balance">
                        Balance: <input id="balance" type="text" defaultValue={this.props.card.client.balance} onChange={this.validateBalance} ref={this.setInputsRefs}/>
                        <span className="message" data-message="balance" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <div className="actions">
                        <button className={`btn save ${(this.state.allValidated) ? 'enable' : ''}`} onClick={this.saveClient}>Save</button>
                        <button className="btn cancel" onClick={this.cancelCard}>Cancel</button>
                    </div>
                </div>  
            );
            case 'add': return (
                <div>
                    <label htmlFor="name">
                        Name: <input id="name" type="text" value={this.props.card.client.name} defaultValue={this.props.card.client.name} onChange={this.validateName} ref={this.setInputsRefs}/>
                        <span className="message" data-message="name" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <label htmlFor="surname">
                        Surname: <input id="surname" type="text" defaultValue={this.props.card.client.surname} onChange={this.validateSurname} ref={this.setInputsRefs}/>
                        <span className="message" data-message="surname" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <label htmlFor="age">
                        Age: <input id="age" type="text" defaultValue={this.props.card.client.age} onChange={this.validateAge} ref={this.setInputsRefs}/>
                        <span className="message" data-message="age" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <label htmlFor="company">
                        Company: <input id="company" type="text" defaultValue={this.props.card.client.company} onChange={this.validateCompany} ref={this.setInputsRefs}/>
                        <span className="message" data-message="company" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <label htmlFor="balance">
                        Balance: <input id="balance" type="text" defaultValue={this.props.card.client.balance} onChange={this.validateBalance} ref={this.setInputsRefs}/>
                        <span className="message" data-message="balance" ref={this.setModalMessagesRefs}></span>
                    </label>
                    <div className="actions">
                        <button className={`btn add ${(this.state.allValidated) ? 'enable' : ''}`} onClick={this.addClient}>Add</button>
                        <button className="btn cancel" onClick={this.cancelCard}>Cancel</button>
                    </div>
                </div>
            );
        }
    }
    render() {
        console.log(`Render Card with key: ${this.props.card.client.id}`);
        return (
            <div className="Card">
                <h3>Card with ID:{this.props.card.client.id}</h3>
                {this.renderCard()}

            </div>
        )
    }
}

export default Card
