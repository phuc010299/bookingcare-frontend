import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './AllDoctor.scss';
import './DoctorSchedule.scss'
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils'; //
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';




class AllDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            selectDoctor: '',
            listDoctor: ''
        }
    }

    async componentDidMount() {
        let res = await userService.getAllDoctors()
        if (res && res.errCode === 0) {
            this.setState({
                arrDoctor: res.data,
                selectDoctor: ''
            })
        }

        let { arrDoctor } = this.state

        let listDoctor = await this.buildDataInputSelect(arrDoctor)
        this.setState({
            listDoctor: listDoctor
        });
    }

    buildDataInputSelect = (inputdata) => {
        let { language } = this.props
        let results = []
        if (inputdata && inputdata.length > 0) {
            inputdata.map(item => {
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

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            let { arrDoctor } = this.state
            let listDoctor = await this.buildDataInputSelect(arrDoctor)
            this.setState({
                listDoctor: listDoctor
            });
        }
    }

    handleViewDetailDoctor = (id) => {
        this.props.history.push(`/detail-doctor/${id}`)
    }


    render() {
        let { arrDoctor, listDoctor } = this.state
        let { language } = this.props
        console.log('check arrDoctor', arrDoctor)

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='all-doctor-container row'>
                    <div className='content-select-doctor col-12 form-group'>

                        <select className='form-control select-doctor'
                            onChange={(event) => this.handleViewDetailDoctor(event.target.value)}
                        >
                            <option>
                                -------- Choose --------
                            </option>
                            {listDoctor && listDoctor.length > 0 && listDoctor.map((item, index) => {
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
                    <div className='content-body  col-12'>
                        <div className='content-body-up'>
                            <FormattedMessage id="patient.all-doctor.choose-doctor" />

                        </div>
                        {arrDoctor && arrDoctor.length > 0
                            && arrDoctor.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (
                                    <div onClick={() => this.handleViewDetailDoctor(item.id)}
                                        className='content-body-down'>
                                        <div className='content-child'>
                                            <div className='img-doctor' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                            <div className='infor-doctor'>
                                                <div className='name-doctor'>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDoctor);
