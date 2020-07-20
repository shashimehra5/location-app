import React from 'react';

import classes from './Input.module.scss';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    const parentClasses = [classes.Input];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        parentClasses.push(classes.Invalid)
    }

    switch (props.elementtype) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    name={props.elementConfig.name}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.key} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={parentClasses.join(' ')}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;