import React from 'react';
import AddLocation from '../AddLocation/AddLocation';

const Header = props => {
    const { onAddClick } = props;
    return (
        <React.Fragment>
            <h6 className="font-weight-bold float-left main-header">Locations</h6>
            <AddLocation onAddClick={onAddClick}/>
        </React.Fragment>
    );
}

export default Header;