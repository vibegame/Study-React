import React, { PureComponent } from 'react'
import './ButtonsSorting.css';
import { Events } from './events';
class ButtonsSorting extends PureComponent {
    state = {
        sortEnable: 'all'
    }
    setSort = (EO) => {
        let signal = EO.currentTarget.getAttribute("data-click");
        this.setState({
            sortEnable: signal
        });
        Events.emit("setSorting", signal);
    }
    render() {
        console.log("Render ButtonsSorting");
        return (
            <div className="ButtonsSorting"> 
                <button data-click="all" className={`btn all ${this.state.sortEnable == 'all' ? 'enable' : ''}`} onClick={this.setSort}>All</button>
                <button data-click="active" className={`btn active ${this.state.sortEnable == 'active' ? 'enable' : ''}`} onClick={this.setSort}>Active</button>
                <button data-click="blocked" className={`btn blocked ${this.state.sortEnable == 'blocked' ? 'enable' : ''}`} onClick={this.setSort}>Blocked</button>
            </div>
        )
    }
}
export default ButtonsSorting;
