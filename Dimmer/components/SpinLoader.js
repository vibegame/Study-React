import React, { PureComponent } from 'react'
import Loader from './Loader';
import Dimmer from "./Dimmer";
import './SpinLoader.css';
class SpinLoader extends PureComponent {
    state = {
        active: true
    }
    setS = () => {
        this.setState({
            active: false
        });
    }
    render() {
        return (
            <div className="SpinLoader">
                <Dimmer active={true}>
                    <Loader />
                </Dimmer>
            </div>
        )
    }
}

export default SpinLoader
