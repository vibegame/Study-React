import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { voteEvents } from './events';
import './Card.css';
class Card extends PureComponent {
    static propTypes = {
        client: PropTypes.object
    }
    inputRefs = {};
    inputMessages = {};
    allValidate = true;
    setInput = (ref) => {
        this.inputRefs[ref.name] = ref;
    }
    setMessages = (ref) => {
        this.inputMessages[ref.getAttribute('data-ref')] = ref;
    }
    showMessage = (EO, type) => {
        EO.className = `message ${type}`;
    }
    validateName = (EO) => {
        this.setInput(EO);
        let value = this.inputRefs['name'].value;
        let message = this.inputMessages['name'];
        if(value.length < 3) {
            message.innerHTML = "Слишком коротко!";
            this.showMessage(message, "error");
            this.allValidate = false;
        }
        else if(!/^[A-zА-яЁё]+$/.test(value)) {
            message.innerHTML = "Только буквы";
            this.showMessage(message, "error");
            this.allValidate = false;
        }
        else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            message.innerHTML = "Недопустимые символы(ENG)";
            this.showMessage(message, "error");
            this.allValidate = false;
        } 
        else {
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
            this.allValidate = false;
        }
        message.classList.add("active");
    }
    validateBalance = (EO) => {
        this.setInput(EO);
        let value = this.inputRefs['balance'].value;
        let message = this.inputMessages['balance'];
        if(!value.length) {
            this.setState({allValidated: false});
            message.innerHTML = "Пусто!";
            this.showMessage(message, "error");
        }
        else if (!/^\d+$/.test(value)) {
            this.setState({allValidated: false});
            message.innerHTML = "Только число!";
            this.showMessage(message, "error");
        } 
        else {
            this.setState({allValidated: true});
            message.innerHTML = "Отлично!";
            this.showMessage(message, "success");
        }
        message.classList.add("active");
    }
    render() {
        console.log(`Render Card`);
        return (
            <div className="Card">
                <label>Name: <input name="name" defaultValue={this.props.client.name} ref={this.setInput} onChange={this.validateName} /> <span data-ref="name" className="message" ref={this.setMessages}></span></label>
                <label>Surname: <input name="surname" className="readOnly" value={this.props.client.surname} readOnly/></label>
                <label>Age: <input name="age" className="readOnly" value={this.props.client.age} ref={this.setInput} readOnly/></label>
                <label>Balance: <input name="balance" defaultValue={this.props.client.balance} ref={this.setInput} onChange={this.validateBalance}/><span data-ref="balance" className="message" ref={this.setMessages}></span></label>
                <div className="buttons">
                    <button className = "btn save">Save</button>
                    <button className = "btn cancel">Cancel</button>
                </div>
            </div>
        )
    }
}

export default Card
