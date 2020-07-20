import React from 'react';
import Styles from './addLocation.module.scss'

const AddLocation = props => {
    const classes = ['btn', Styles.btn_home].join(' ');
    return (
        <React.Fragment>
            <div className={'float-right '+Styles.home_header_buttons}>
                <button className={classes} onClick={props.onAddClick}>+ Add Location</button>
            </div>
        </React.Fragment>
    );
}

export default AddLocation;