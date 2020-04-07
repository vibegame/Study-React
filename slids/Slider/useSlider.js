import {useState} from 'react';


export default function useSlider(data, onComplete) {

    const [activeIndex, setActiveIndex] = useState(0);

    function end() {
        onComplete && onComplete();
    }

    function next() {
        console.log(activeIndex, data.length, "next");
        if(activeIndex !== data.length - 1)
            setActiveIndex(activeIndex + 1);
    }

    function back() {
        console.log(activeIndex, data.length, "back");
        if(activeIndex !== 0)
            setActiveIndex(activeIndex - 1);
    }

    return {
        activeItem: data[activeIndex],
        back,
        next,
        end,
        activeIndex
    };

}
