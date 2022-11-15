import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import userService from '../../../services/userService';
import moment from 'moment/moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';




class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        this.getDataPatient()


    }

    getDataPatient = async () => {
        let doctorId = this.props.userInfo.id
        let { curentDate } = this.state
        let formatDate = new Date(curentDate).getTime()
        let res = await userService.getListPatientForDoctor(doctorId, formatDate)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeDatePicker = async (date) => {
        this.setState({
            curentDate: date[0]
        }, () => {
            this.getDataPatient()

        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await userService.postSendRemedy({
            ...dataModal,
            ...dataChild,
            language: this.props.language
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy success')
            this.getDataPatient()


        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send Remedy failed')
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading ...'
                >

                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            quan ly benh nhan kham benh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>chon ngay kham</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnchangeDatePicker}
                                    // minDate={new Date().setDate(new Date().getDate() - 1)}
                                    value={this.state.curentDate}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Firstname</th>
                                            <th>Address</th>
                                            <th>Gender</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>

                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let gender = language === LANGUAGES.VI
                                                ? item.patientData.genderData.valueVi
                                                : item.patientData.genderData.valueEn
                                            return (
                                                <tbody>
                                                    <tr key={index}>
                                                        <td>{item.patientData.email}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className='mp-btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >Confirm</button>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                        :
                                        <tbody>
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: 'center' }}> No data</td>
                                            </tr>
                                        </tbody>

                                    }


                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeModal={this.closeModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>

            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
