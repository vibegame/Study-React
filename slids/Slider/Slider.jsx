import React, {useState, useRef} from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import style from './Slider.scss';
import useSlider from "./useSlider";

Slider.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        owner: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.any,
        render: PropTypes.node
    })),
    onComplete: PropTypes.func
};

function Slider(props) {

    const [errorMessage, setErrorMessage] = useState('');

    const timerErrorMessage = useRef(null);

    const {next, back, activeItem, activeIndex, end} = useSlider(props.data, props.onComplete);

    const isShownSlide = (id) => id < activeItem.id;

    const isActiveSlide = (id) => id === activeItem.id;

    const getStateSlide = (id) => {

        if (isActiveSlide(id)) {
            return "active";
        }

        if (isShownSlide(id)) {
            return "shown";
        }

        return "not-shown";

    };

    const showError = (text) => {

        setErrorMessage(text);

        if(timerErrorMessage.current !== null) {
            clearTimeout(timerErrorMessage.current);
        }

        timerErrorMessage.current = setTimeout(() => {
            setErrorMessage('');
            timerErrorMessage.current = null;
        }, 3000);

    };

    const onNext = () => {
        if(activeIndex === props.data.length - 1) {
            showError('Вперёд нельзя. Только назад!');
        }

        next();
    };

    const onBack = () => {
        if(activeIndex === 0) {
            showError('Назад нельзя. Только вперёд!');
        }

        back();
    };

    const onSkip = () => {
        end();
    };

    const getSlide = ({owner, description, id, render}) => {

        return (

            <div
                className={style.slide}
                data-state={getStateSlide(id)}
                key={id}
            >

                {
                    render ? render : (
                        <div className={style.content}>
                            <span className={style.company}>Твоя любимая команда СББОЛ</span>
                            <span className={style.description}>{description}</span>
                            <span className={style.owner}>{owner}</span>
                        </div>
                    )
                }

            </div>

        );

    };


    return (
        <div className={style.container}>
            {
                props.data.map(slide => {
                    return (
                        getSlide(slide)
                    );
                })
            }

            <button onClick={onBack} className={classNames(style.leftSide, style.sliderToggler)}>
                <div className={style.togglerContent}>
                    Back
                </div>
            </button>

            <button onClick={onNext} className={classNames(style.rightSide, style.sliderToggler)}>
                <div className={style.togglerContent}>
                    Next
                </div>
            </button>

            {
                Boolean(errorMessage.length) && (
                    <div className={style.errorMessage}>
                        {
                            errorMessage
                        }
                    </div>
                )
            }

            <button onClick={onSkip} className={style.skip}>Skip</button>
        </div>
    );
}

export default Slider;
