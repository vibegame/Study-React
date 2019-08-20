import React from 'react';
import BR2JSX from './BR2JSX';
import './BR2JSX.css';
class App extends React.Component {
    render() {
        let text="первый<br>второй<br/>третий<br />последний";
        return <div className="app"><BR2JSX text={text}/></div>;
    }
}
export default App;