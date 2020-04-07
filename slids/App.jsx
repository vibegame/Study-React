import React, {useState} from 'react';

import data from './data';

import style from './App.pcss';
import Slider from "./components/Slider/Slider";

const App = (props) => {

    const [isActive, setIsActive] = useState(true);

    return (
            isActive && (
                <Slider data={data} onComplete={() => setIsActive(false)} />
            )
    );
};

export default App;
