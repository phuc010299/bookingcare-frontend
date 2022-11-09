import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils'
import userService from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';


class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;



    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }

        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            let res = await userService.getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfor = (status) => {
        this.setState({ isShowDetailInfor: status })
    }

    render() {
        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.extra-infor-doctor.text-address" /></div>
                    <div className='name-clinic'>{extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>

                <div className='content-down'>
                    {isShowDetailInfor === false
                        ? <div className='short-infor'>
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}
                                />
                            }
                            {extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }

                            {/* {language === LANGUAGES.VI && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVi : extraInfor.priceTypeData.valueEn} */}
                            <span className='detail' onClick={() => this.showHideDetailInfor(true)}>Xem chi tiết</span>.
                        </div>
                        : <>
                            <div className='tile-price'> <FormattedMessage id="patient.extra-infor-doctor.price" /> .</div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'> <FormattedMessage id="patient.extra-infor-doctor.price" /></span>
                                    <span className='right'>
                                        {extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        }
                                        {extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                            <NumberFormat
                                                value={extraInfor.priceTypeData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}
                                            />
                                        }
                                        {/* {extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVi : ''} */}
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor.paymentTypeData && language === LANGUAGES.VI &&
                                    extraInfor.paymentTypeData.valueVi
                                }
                                {extraInfor.paymentTypeData && language === LANGUAGES.EN &&
                                    extraInfor.paymentTypeData.valueEn
                                }

                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)} > <FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span>
                            </div>



                        </>}
                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
