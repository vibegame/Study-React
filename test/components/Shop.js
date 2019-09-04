import React from 'react';
import PropTypes from 'prop-types';
import "./Shop.css";
import {Events} from './events'
class Shop extends React.PureComponent {
    static PropTypes = {
        goods: PropTypes.array
    }
    state = {
        text:"aa"
    }
    getRef = (node) => {
        console.log(node);
    }
    sayHello = (text) => {
        this.setState({
            text: text
        });
        console.log(text);
    }
    btnClick = () => {
        Events.emit("sayHello", "nikita");
    }
    componentWillUnmount() {
        console.log("ComponentWillUnmount");
        Events.removeListener("sayHello", this.sayHello);
    }
    componentDidMount() {
        console.log("ComponentDidMount");
        Events.addListener("sayHello", this.sayHello);
    }
    componentWillUpdate() {
        console.log("ComponentWillUpdate");
    }
    render() {
        return (
            <div>
                <button onClick={this.btnClick} ref={this.getRef}>Click</button>
            </div>
        );
    }
}
export default Shop;