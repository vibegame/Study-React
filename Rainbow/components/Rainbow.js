import React from 'react';
import RainbowFrame from './Frame';
import {bindFrame} from './bindFrame';
import "./Rainbow.css";
class Rainbow extends React.Component {
    render() {
        let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
        let MainFrame = bindFrame(colors)(RainbowFrame);
        return (<MainFrame>
            Hello!
        </MainFrame>)
    }
}
export default Rainbow;