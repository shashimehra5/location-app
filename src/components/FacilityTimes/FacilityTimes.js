import React, { Component } from 'react';

import './FacilityTimes.scss';
import Button from '../../layout/Button/Button';


class FacilityTimes extends Component {
    state = {
        facilityTimes: [
            {
                day: 'Sun',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Mon',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Tue',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Wed',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Thurs',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Fri',
                from: '10:30',
                to: '06:30',
                checked: false
            }, {
                day: 'Sat',
                from: '10:30',
                to: '06:30',
                checked: false
            }
        ]
    }
    applyToAll = index => {
        const applyValue = this.state.facilityTimes[index];
        const updatedForm = this.state.facilityTimes.map(el => {
            if (el.checked === true) {
                return {
                    ...el,
                    from: applyValue.from,
                    to: applyValue.to
                }
            }
            return el;
        });
        this.setState({ facilityTimes: updatedForm });
    }

    saveFacility = event => {
        console.log('called save');
        event.preventDefault();
        this.props.setFacility(this.state);
        this.closeModal(false);
    }

    closeModal = (clear) => {
        this.props.modalClosed('facilityForm');
        if(clear) {
            const updatedForm = [...this.state.facilityTimes];
            for (let formElementIdentifier of updatedForm) {
                formElementIdentifier.from = "10:30";
                formElementIdentifier.to = "06:30";
                formElementIdentifier.checked = false;
            }
            this.setState({ facilityTimes: updatedForm });
        }
    }

    onInputChangeHandler = (event, index, inputId) => {
        const name = inputId;
        const value = event.target.value;
        const updatedForm = [...this.state.facilityTimes];
        if (name === 'checked') {
            updatedForm[index][inputId] = !updatedForm[index][inputId];
        } else {
            updatedForm[index][inputId] = value;
        }
        this.setState({ facilityTimes: updatedForm });
    }

    render() {
        return (
            <form onSubmit={this.saveFacility} className="ft-container">
                <h6 className="font-weight-bold modal-heading">Facility Times</h6>
                {
                    this.state.facilityTimes.map((time, index) => {
                        return (
                            <div className="row form-group" key={time.day}>
                                <div className="col-sm-1">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" onChange={(event) => this.onInputChangeHandler(event, index, 'checked')} id={time.day} checked={time.checked} />
                                        <label className="form-check-label ml-2" htmlFor={time.day}>{time.day}</label>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <input type="text" className="form-control inline-block" onChange={(event) => this.onInputChangeHandler(event, index, 'from')} value={time.from} />
                                    <div className="switch">
                                        <div className="switch__primary-btn inline-block">am</div>
                                        <div className="switch__secondary-btn inline-block">pm</div>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-right">
                                    <input type="text" className="form-control inline-block" onChange={(event) => this.onInputChangeHandler(event, index, 'to')} value={time.to} />
                                    <div className="switch">
                                        <div className="switch__secondary-btn inline-block">am</div>
                                        <div className="switch__primary-btn inline-block">pm</div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <button className="ft-container__apply" type="button" onClick={() => this.applyToAll(index)}>Apply to All Checked</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="button-group float-right mt-4">
                    <Button clicked={this.closeModal} btnType="button" class="btn btn-secondary secondary-style mr-2">Cancel</Button>
                    <Button btnType="submit" class="btn btn-primary primary-style">Save</Button>
                </div>
            </form>
        );
    }
}

export default FacilityTimes;