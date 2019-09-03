import React, { PureComponent } from 'react'
import {Events} from './events';
import './Company.css';
class Company extends PureComponent {
    state = {
        currentCompany: 'mts'
    }
    setCompany = (EO) => {
        let company = EO.currentTarget.getAttribute("data-click");
        this.setState({
            currentCompany: company
        });
        Events.emit("setCompany", company);
    }
    render() {
        console.log(`Render Company`);
        return (
            <div className="Company">
                <button data-click="mts" className={`btn ${this.state.currentCompany == 'mts' ? 'enable' : ''}`} onClick={this.setCompany}>MTS</button>
                <button data-click="a1" className={`btn ${this.state.currentCompany == 'a1' ? 'enable' : ''}`} onClick={this.setCompany}>A1</button>
            </div>
        )
    }
}

export default Company
