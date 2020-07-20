import React from 'react';

const NoLocation = () => {
    return (
        <div className="no-location">
            <div className="no-location__icon-cont">
                <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="no-location__description text-center mt-4">
                <h6 className="font-weight-bold">Kindly Add Your Location First</h6>
                <small>There is no location added yet</small>
            </div>
        </div>
    );
}

export default NoLocation;