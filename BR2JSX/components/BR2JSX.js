import React from 'react';
import "./BR2JSX.css";
class BR2JSX extends React.Component {
    renderWords = () => {
        let jsxCode = [];
        let arr = this.props.text.split(/<br\s*[\/]?>/gi);
        for(let i = 0;i<arr.length;i++) {
            jsxCode.push(arr[i], <br key={i}/>);
        }
        return jsxCode;
    }
    render() {
        return (this.renderWords());
    }
}
export default BR2JSX;