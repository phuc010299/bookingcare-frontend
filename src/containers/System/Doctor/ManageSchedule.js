import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import userService from '../../../services/userService';




class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            curentDate: '',
            rangeTime: [],
            // allAvailableTime: [],
        };
    }


    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.fetchAllcodeScheduleTime()
    }

    buildDataInputSelect = (inputData) => {
        let results = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                results.push(object)
            })
        }
        return results
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data.map((item, index) => {
                    item.isSelected = false
                    return item
                })
                data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            });
        }

    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            curentDate: date[0]
        })
        // this.handleOnchangeSelect(date[0])
    }
    handleClickBtn = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime.map((item) => {
                if (item.id === time.id) item.isSelected = !time.isSelected
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }

    }


    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, curentDate } = this.state
        let results = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("INVALID SELECTED DOCTOR");
            return
        }
        if (!curentDate) {
            toast.error("INVALID DATE");
            return
        }
        let formatedDate = new Date(curentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    results.push(object)
                })
            }
        }
        let res = await userService.bulkCreateSchedule({
            arrSchedule: results,
            doctorId: selectedDoctor.value,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            rangeTime.map((item) => {
                item.isSelected = false
                return item
            })
            toast.success("SAVE SCHEDULE DOCTOR SUCCESS!");
            this.setState({
                curentDate: '',
                rangeTime: rangeTime
            });
        } else {
            toast.error("SAVE SCHEDULE DOCTOR FAILED");
        }
    }




    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                defaultValue={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangeDatePicker}
                                minDate={new Date().setDate(new Date().getDate() - 1)}
                                value={this.state.curentDate}
                            />
                        </div>
                    </div>

                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0
                            && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                        key={index}
                                        onClick={() => this.handleClickBtn(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                    </div>
                    <div className='col-12'>
                        <button className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        language: state.app.language
        // systemMenuPath: state.app.systemMenuPath,
        // isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeScheduleTime: () => dispatch(actions.fetchAllcodeScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
