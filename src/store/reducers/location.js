import * as actionTypes from '../actions/actionTypes';
import { compare } from '../utility';

const initialState = {
    locationList: [{
        id: 1,
        locationName: 'Logix',
        address1: 'test',
        suiteno: '6th floor',
        address2: 'near this building',
        city: 'noida',
        state: 'Uttar Pradesh',
        zipCode: '201301',
        phone: '9999999999',
        timezone: 'UET',
        appointmentPool: ['pool1', 'pool2'],
        facilityTimes: []
    },{
        id: 2,
        locationName: 'apollo',
        address1: 'test',
        suiteno: '6th floor',
        address2: 'near this building',
        city: 'noida',
        state: 'Uttar Pradesh',
        zipCode: '201301',
        phone: '9999999999',
        timezone: 'UET',
        appointmentPool: ['pool1'],
        facilityTimes: []
    } ,{
        id: 3,
        locationName: 'Logix 1',
        address1: 'test',
        suiteno: '6th floor',
        address2: 'near this building',
        city: 'noida',
        state: 'Uttar Pradesh',
        zipCode: '201301',
        phone: '9999999999',
        timezone: 'UET',
        appointmentPool: ['pool1'],
        facilityTimes: []
    }],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LOCATION:
            console.log('AddLocation ', action.payload);
            return {
                ...state,
                locationList: [action.payload, ...state.locationList]
            }
        case actionTypes.DELETE_LOCATION:
            return {
                ...state,
                locationList: state.locationList.filter(location => location.id !== action.payload)
            };
        case actionTypes.EDIT_LOCATION:
            return {
                ...state,
                locationList: state.locationList.map(
                    location => location.id === action.payload.id ? action.payload.location : location
                )
            };
        case actionTypes.SORT_LOCATION:
            const sorted = [...state.locationList];
            return {
                ...state,
                locationList: sorted.sort(compare)
            }
        default: return state;
    }
};

export default reducer;