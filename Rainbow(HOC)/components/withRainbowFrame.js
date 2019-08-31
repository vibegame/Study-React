import React from 'react';
export default ((colors) => (Component) => (props) => {
    let element = <Component {...props} />;
    for(let i=0;i<colors.length;i++) {
        element = <div style={{border: "solid 10px " + colors[i], padding: "8px"}}>{element}</div>
    }
    return element;    
});