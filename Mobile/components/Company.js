import React, { PureComponent } from 'react'
import {voteEvents} from './events';
import './Company.css';
class Company extends PureComponent {
    state = {
        currentCompany: "mts"
    }
    btnDeleteRef = null;
    btnEditRef = null;
    changeCompany = (company) => {
        voteEvents.emit("changeCompany", company);
    }
    selectMTS = (EO) => {
        if(this.state.currentCompany != "mts")
        {
            this.setState({
                currentCompany: "mts"
            });
            this.changeCompany("mts");
        } 
        return;
    }
    selectA1 = (EO) => {
        if(this.state.currentCompany != "a1")
        {
            this.setState({
                currentCompany: "a1"
            });
            this.changeCompany("a1");
        } 
        return;
    }
    render() {
        console.log(`Render Company`);
        return (
            <div className="Company">
                <button className={`btn c-mts ${(this.state.currentCompany == 'mts') ? 'active' : ''}`} onClick={this.selectMTS}>MTS</button>
                <button className={`btn c-velcom ${(this.state.currentCompany == 'a1') ? 'active' : ''}`} onClick={this.selectA1}>A1</button>
            </div>
        )
    }
}

export default Company
