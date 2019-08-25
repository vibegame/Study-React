import React from 'react';

function bindFrame(colors) {
    return function(Component) {
        return props => {
            let element = <Component {...props} />;
            for(let i=0;i<colors.length;i++) {
                element = <div style={{border: "solid 14px " + colors[i], padding: "5px"}}>{element}</div>
            }
            return element;
        }
    };
}

export { bindFrame };