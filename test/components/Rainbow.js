import React from 'react';
import Frame from './Frame';
import withRainbowFrame from './withRainbowFrame';
import "./Rainbow.css";
class Rainbow extends React.Component {
    render() {
        console.log(withRainbowFrame);
        let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
        let RainbowFrame = withRainbowFrame(colors)(Frame);
        return (
        <RainbowFrame>
            Hello!
        </RainbowFrame>)
    }
}
export default Rainbow;