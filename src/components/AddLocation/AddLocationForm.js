import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';

import Input from '../../layout/Input/Input';
import Button from '../../layout/Button/Button';
import { ADD_LOCATION, EDIT_LOCATION } from '../../store/actions/actionTypes';
import Classes from './addLocation.module.scss';
import Modal from '../../layout/Modal/Modal';
import FacilityTimes from '../FacilityTimes/FacilityTimes';
import { checkValidity } from '../../store/utility';

class AddLocationForm extends Component {
    state = {
        editForm: false,
        locationForm: {
            id: {
                value: uuid()
            },
            locationName: {
                elementConfig: {
                    type: 'text',
                    name: 'locationName'
                },
                validation: {
                    required: true
                },
                value: '',
                label: 'Location Name',
                valid: false,
                touched: false
            },
            address1: {
                elementConfig: {
                    type: 'text',
                    name: 'address1'
                },
                validation: {},
                value: '',
                label: 'Address Line 1',
                valid: true,
                touched: false
            },
            suiteno: {
                elementConfig: {
                    type: 'text',
                    name: 'suiteno'
                },
                validation: {},
                value: '',
                label: 'Suite No.',
                valid: true,
                touched: false
            },
            address2: {
                elementConfig: {
                    type: 'text',
                    name: 'address2'
                },
                validation: {},
                value: '',
                label: 'Address Line 2',
                valid: true,
                touched: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    name: 'city'
                },
                validation: {},
                value: '',
                label: 'City',
                valid: true,
                touched: false
            },
            state: {
                elementConfig: {
                    options: [],
                    name: 'state'
                },
                validation: {},
                value: '',
                label: 'State',
                valid: true,
                touched: false
            },
            zipCode: {
                elementConfig: {
                    type: 'text',
                    name: 'zipCode'
                },
                validation: {},
                value: '',
                label: 'Zip Code',
                validation: {
                    minLength: 5,
                    maxLength: 10,
                },
                valid: false,
                touched: false
            },
            phone: {
                elementConfig: {
                    type: 'number',
                    name: 'phone'
                },
                validation: {},
                value: '',
                label: 'Phone Number',
                valid: true,
                touched: false
            },
            timezone: {
                elementConfig: {
                    options: [],
                    name: 'timezone'
                },
                validation: {},
                value: '',
                label: 'timezone',
                valid: true,
                touched: false
            },
            appointmentPool: {
                value: []
            },
            facilityTimes: {
                value: []
            },
        },
        showFacilityModal: false,
        formIsValid: false
    };

    componentDidMount() {
        const updatedForm = JSON.parse(JSON.stringify(this.state.locationForm));
        fetch('https://states-ea682.firebaseio.com/data.json').then(res => res.json()).then(result => {
            updatedForm.state.elementConfig.options = result.states;
            updatedForm.timezone.elementConfig.options = result.timezone;
            this.setState({ locationForm: updatedForm });
        });
    }

    onInputChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        const updatedAddLocationForm = {
            ...this.state.locationForm
        };
        const updatedFormElement = {
            ...updatedAddLocationForm[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedAddLocationForm[name] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedAddLocationForm) {
            if(inputIdentifier !== 'appointmentPool' && inputIdentifier !== 'facilityTimes' && inputIdentifier !== 'id') {
                formIsValid = updatedAddLocationForm[inputIdentifier].valid && formIsValid;
            }
        }
        this.setState({ locationForm: updatedAddLocationForm, formIsValid: formIsValid });
    }

    locationHandler = (event) => {
        event.preventDefault();

        const locationData = {};
        for (let formElementIdentifier in this.state.locationForm) {
            locationData[formElementIdentifier] = this.state.locationForm[formElementIdentifier].value;
        }
        if (this.state.editForm) {
            this.props.onEditLocation(locationData, locationData['id']);
        } else {
            this.props.onAddLocation(locationData);
        }

        this.closeModal();
    }

    closeModal = () => {
        this.props.modalClosed();
        if(!this.state.editForm) {
            const updatedForm = { ...this.state.locationForm };
            for (let formElementIdentifier in this.state.locationForm) {
                updatedForm[formElementIdentifier].value = '';
            }
            this.setState({ locationForm: updatedForm });
        }
    }

    appointmentPoolHandler = event => {
        let value = event.target.value;
        const txt = value.replace(/[^a-zA-Z0-9\+\-\.\#]/g, '');
        if (/(188|13)/.test(event.keyCode)) {
            const updatedForm = JSON.parse(JSON.stringify(this.state.locationForm));
            const poolArray = this.state.locationForm.appointmentPool.value;
            if (txt && poolArray.indexOf(txt) === -1) {
                updatedForm['appointmentPool']['value'] = [...poolArray, txt];
                this.setState({
                    locationForm: updatedForm
                });
            }
            event.target.value = "";
        }
    }

    deletePoolTag = event => {
        const target = event.target.getAttribute('id');
        const updatedForm = JSON.parse(JSON.stringify(this.state.locationForm));
        const updatedPool = [...updatedForm.appointmentPool.value];
        const index = updatedPool.indexOf(target);
        updatedPool.splice(index, 1);
        updatedForm['appointmentPool']['value'] = updatedPool;
        this.setState({ locationForm: updatedForm });
    }

    onFacilityHandler = facilityState => {
        const updatedForm = JSON.parse(JSON.stringify(this.state.locationForm));
        updatedForm['facilityTimes']['value'] = facilityState.facilityTimes;
        this.setState({ locationForm: updatedForm });
    }

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        if (location !== this.props.location) {
            const updatedForm = { ...this.state.locationForm };
            if (location && location.id) {
                for (let formElementIdentifier in this.state.locationForm) {
                    updatedForm[formElementIdentifier].value = location[formElementIdentifier];
                    updatedForm[formElementIdentifier].valid = true;
                }
                this.setState({ locationForm: updatedForm, editForm: true, formIsValid: true });
            } else {
                for (let key in this.state.locationForm) {
                    updatedForm[key].value = '';
                    updatedForm[key].valid = key === 'locationName' || key === 'zipCode' ? false : true;
                }
                this.setState({ locationForm: updatedForm, editForm: false, formIsValid: false });
            }
        }
    }

    showFacilityModal = () => {
        this.setState({ showFacilityModal: true });
    }

    render() {
        return (
            <React.Fragment>
                <Modal show={this.props.showLocation}>
                    <div>
                        <h6 className="font-weight-bold modal-heading">Add Location</h6>
                        <form onSubmit={this.locationHandler}>
                            <div className="form-group">
                                <Input
                                    elementtype='input'
                                    elementConfig={this.state.locationForm.locationName.elementConfig}
                                    label={this.state.locationForm.locationName.label}
                                    value={this.state.locationForm.locationName.value}
                                    invalid={!this.state.locationForm.locationName.valid}
                                    shouldValidate={this.state.locationForm.locationName.validation}
                                    touched={this.state.locationForm.locationName.touched}
                                    changed={this.onInputChangeHandler} />
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.address1.elementConfig}
                                        label={this.state.locationForm.address1.label}
                                        value={this.state.locationForm.address1.value}
                                        invalid={!this.state.locationForm.address1.valid}
                                        shouldValidate={this.state.locationForm.address1.validation}
                                        touched={this.state.locationForm.address1.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                                <div className="col">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.suiteno.elementConfig}
                                        label={this.state.locationForm.suiteno.label}
                                        value={this.state.locationForm.suiteno.value}
                                        invalid={!this.state.locationForm.suiteno.valid}
                                        shouldValidate={this.state.locationForm.suiteno.validation}
                                        touched={this.state.locationForm.suiteno.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-sm-6">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.address2.elementConfig}
                                        label={this.state.locationForm.address2.label}
                                        value={this.state.locationForm.address2.value}
                                        invalid={!this.state.locationForm.address2.valid}
                                        shouldValidate={this.state.locationForm.address2.validation}
                                        touched={this.state.locationForm.address2.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                                <div className="col-sm-3">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.city.elementConfig}
                                        label={this.state.locationForm.city.label}
                                        value={this.state.locationForm.city.value}
                                        invalid={!this.state.locationForm.city.valid}
                                        shouldValidate={this.state.locationForm.city.validation}
                                        touched={this.state.locationForm.city.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                                <div className="col-sm-3">
                                    <Input
                                        elementtype='select'
                                        elementConfig={this.state.locationForm.state.elementConfig}
                                        label={this.state.locationForm.state.label}
                                        value={this.state.locationForm.state.value}
                                        invalid={!this.state.locationForm.state.valid}
                                        shouldValidate={this.state.locationForm.state.validation}
                                        touched={this.state.locationForm.state.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.zipCode.elementConfig}
                                        label={this.state.locationForm.zipCode.label}
                                        value={this.state.locationForm.zipCode.value}
                                        invalid={!this.state.locationForm.zipCode.valid}
                                        shouldValidate={this.state.locationForm.zipCode.validation}
                                        touched={this.state.locationForm.zipCode.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                                <div className="col">
                                    <Input
                                        elementtype='input'
                                        elementConfig={this.state.locationForm.phone.elementConfig}
                                        label={this.state.locationForm.phone.label}
                                        value={this.state.locationForm.phone.value}
                                        invalid={!this.state.locationForm.phone.valid}
                                        shouldValidate={this.state.locationForm.phone.validation}
                                        touched={this.state.locationForm.phone.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                                <div className="col">
                                    <Input
                                        elementtype='select'
                                        elementConfig={this.state.locationForm.timezone.elementConfig}
                                        label={this.state.locationForm.timezone.label}
                                        value={this.state.locationForm.timezone.value}
                                        invalid={!this.state.locationForm.timezone.valid}
                                        shouldValidate={this.state.locationForm.timezone.validation}
                                        touched={this.state.locationForm.timezone.touched}
                                        changed={this.onInputChangeHandler} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <label>Facility Times</label>
                                    <input type="text" id="facilityTimes" name="facilityTimes" onClick={this.showFacilityModal} />
                                </div>
                                <div className="col">
                                    <label>Appointment Pool</label>
                                    <div id="tags">
                                        {
                                            this.state.locationForm.appointmentPool.value.length > 0 && this.state.locationForm.appointmentPool.value.map(pool => (
                                                <span key={pool} id={pool} onClick={this.deletePoolTag} className={`${Classes.Tag} mb-2`}>{pool}</span>
                                            ))
                                        }
                                        <input className="mt-1" type="text" onKeyUp={this.appointmentPoolHandler} name="appointment" placeholder="Add a skill" />
                                    </div>
                                </div>
                            </div>
                            <div className="button-group float-right">
                                <Button clicked={this.closeModal} btnType="button" class="btn btn-secondary secondary-style mr-2">Cancel</Button>
                                <Button btnType="submit" disabled={!this.state.formIsValid} class="btn btn-primary primary-style">Save</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Modal show={this.state.showFacilityModal}>
                    <FacilityTimes setFacility={this.onFacilityHandler} modalClosed={() => this.setState({ showFacilityModal: false })} />
                </Modal>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddLocation: (location) => dispatch({ type: ADD_LOCATION, payload: location }),
        onEditLocation: (location, id) => dispatch({ type: EDIT_LOCATION, payload: { location, id } })
    }
}

export default connect(null, mapDispatchToProps)(AddLocationForm);