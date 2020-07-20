import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

import './App.scss';
import Header from './components/Header/Header';
import NoLocation from './components/NoLocation/NoLocation';
import AddLocationForm from './components/AddLocation/AddLocationForm';
import LocationList from './components/LocationList/LocationList';

function App(props) {
  const [ showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [ editLocation, setEditLocation] = useState(null);

  const closeModal = () => {
    setShowAddLocationModal(false)
  }

  const onAddLocationClick = location => {
    setEditLocation(location);
    setShowAddLocationModal(true);
  }

  return (
    <div className="location-container">
      <Header onAddClick={onAddLocationClick} />
      {
        props.locationList.length > 0 ? <LocationList onEditLocation={onAddLocationClick} /> : <NoLocation />
      }
      <AddLocationForm showLocation={showAddLocationModal} location={editLocation} modalClosed={closeModal} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
      locationList: state.locationList
  }
}

export default connect(mapStateToProps)(App);
