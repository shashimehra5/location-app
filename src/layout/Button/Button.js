import React from 'react';

const Button = (props) => (
    <button
        type={props.btnType}
        disabled={props.disabled}
        className={props.class}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;