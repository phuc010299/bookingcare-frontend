import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import userService from '../../../../services/userService';
import { toast } from "react-toastify";
import moment from 'moment/moment';



class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            doctorId: "",
            email: "",
            address: "",
            reason: "",
            birthday: "",
            selectedGender: "",
            genders: "",
            timeType: "",
            language: this.props.language,
            timeString: ''


        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart()
    }

    buildDataGender = (data) => {
        let results = [];
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                results.push(object)
            })
        }
        return results

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        let { dataTime } = this.props
        if (prevProps.dataTime !== this.props.dataTime) {
            let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
            this.setState({
                doctorId: doctorId,
                timeType: dataTime.timeType,
            })
        }

    }

    handleOnchangeInput(event, id) {
        let valueInput = event.target.value
        let copyState = { ...this.state }
        copyState[id] = valueInput
        this.setState({
            ...copyState,
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnchangeSelect = (selectedGender) => {
        this.setState({ selectedGender })

    }
    handleconfirmBooking = async () => {

        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let res = await userService.postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            doctorId: this.state.doctorId,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            timeString: timeString,
            doctorName: doctorName,
            language: this.state.language
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment was successful')
            this.props.closeBookingModal()
        } else {
            toast.error('Booking a new appointment was failed')

        }

    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi
                :
                dataTime.timeTypeData.valueEn
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`


        }
        return ""
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} - ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} - ${dataTime.doctorData.lastName}`
            return name
        }
        return ''
    }


    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal
                isOpen={isOpenModal}
                className="booking-modal-container"
                size='lg'
            >
                <div className="booking-modal-content" >
                    <div className="booking-modal-header">
                        <span className='left'><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span
                            className='right'
                            onClick={closeBookingModal}
                        > <i className='fas fa-times'></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.birthday}
                                />

                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    options={this.state.genders}
                                    onChange={this.handleOnchangeSelect}
                                />
                            </div>
                        </div>


                    </div>
                    <div className="booking-modal-footer">
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleconfirmBooking()}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingModal}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </button>

                    </div>
                </div>
            </Modal>

        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders


    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
