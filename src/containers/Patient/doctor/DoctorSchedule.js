import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import userService from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
import LoadingOverlay from 'react-loading-overlay';





class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alldays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let arrDays = this.getArrDays(language)
        this.setState({
            alldays: arrDays,
        })

        let res = await userService.getScheduleByDate(this.props.doctorIdFromParent, arrDays[0].value)
        if (res && res.errCode === 0) {
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }


    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    getArrDays(language) {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let DDMM = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    let today = `Hôm nay - ${DDMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let DDMM = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                    let today = `Today - ${DDMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            arrDays.push(object)
        }

        return arrDays
        // this.setState({
        //     alldays: arrDays
        // })
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            let arrDays = this.getArrDays(this.props.language)
            this.setState({
                alldays: arrDays
            })
        }

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let arrDays = this.getArrDays(this.props.language)
            let res = await userService.getScheduleByDate(this.props.doctorIdFromParent, arrDays[0].value)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    async handleOnchangeSelect(event) {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let date = event.target.value
            let res = await userService.getScheduleByDate(doctorId, date)
            // console.log('check schedule', res.infor.data)
            if (res && res.errCode === 0) {

                this.setState({
                    allAvailableTime: res.data ? res.data : [],
                    isShowLoading: false
                })
            }
        }
    }


    handleClickScheduleTime(time) {
        this.setState({
            dataScheduleTimeModal: time,
            isOpenModalBooking: true
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { alldays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {alldays && alldays.length > 0 && alldays.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span><i className="far fa-calendar-alt"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className='time-content'>

                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            return <button
                                                key={index}
                                                className={language === LANGUAGES.VI ? "btn-vi" : "btn-en"}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >
                                                {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                            </button>
                                        }
                                        )}
                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>
                                </>

                                : <div className='no-schedule'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataScheduleTimeModal}
                    closeBookingModal={this.closeBookingModal}
                />


            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
