import React from 'react';
import { connect } from 'react-redux';

import { DELETE_LOCATION, SORT_LOCATION } from '../../store/actions/actionTypes';
import { phoneFormatter } from '../../store/utility';

const LocationList = props => {
    return (
        <table className="table">
            <thead onClick={props.onSortHandler}>
                <tr>
                    <th>&nbsp;</th>
                    <th>Location Name</th>
                    <th colSpan="2">Address</th>
                    <th>Phone no.</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.locationList.map((location, index) => {
                        return (
                            <tr key={location.id}>
                                <td><div className="tag">{index + 1}</div></td>
                                <td>{location.locationName}</td>
                                <td colSpan="2">{location.address1} {location.suiteno} {location.address2} {location.city} {location.state} {location.zipCode}</td>
                                <td>{phoneFormatter(location.phone)}</td>
                                <td className="text-right">
                                    <span onClick={() => props.onEditLocation(location)} className="icon edit-location mr-2"><i className="fas fa-pencil-alt" aria-hidden="true"></i></span>
                                    <span onClick={() => props.onDeleteHanlder(location.id)} className="icon delete-location mr-3"><i className="fa fa-trash" aria-hidden="true"></i></span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

const mapStateToProps = state => {
    return {
        locationList: state.locationList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteHanlder: (id) => dispatch({type: DELETE_LOCATION, payload: id}),
        onSortHandler: () => dispatch({type: SORT_LOCATION})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);