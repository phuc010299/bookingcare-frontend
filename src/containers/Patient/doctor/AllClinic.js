import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './AllClinic.scss';
import './DoctorSchedule.scss'
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils'; //
import { FormattedMessage } from 'react-intl';




class AllClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],

        }
    }

    async componentDidMount() {
        let res = await userService.getAllClinics()
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data,
            })
        }


    }


    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleViewDetailSpecialty = (id) => {
        this.props.history.push(`/detail-clinic/${id}`)
    }


    render() {
        let { arrClinic, listClinic } = this.state
        let { language } = this.props
        console.log('check arrClinic', arrClinic)

        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='all-doctor-container row'>
                    <div className='content-select-doctor col-12 form-group'>

                        <select className='form-control select-doctor'
                            onChange={(event) => this.handleViewDetailSpecialty(event.target.value)}
                        >
                            <option>
                                -------- Choose --------
                            </option>
                            {arrClinic && arrClinic.length > 0 && arrClinic.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='content-body  col-12'>
                        <div className='content-body-up'>
                            <FormattedMessage id="patient.all-specialty.choose-specialty" />

                        </div>
                        {arrClinic && arrClinic.length > 0
                            && arrClinic.map((item, index) => {

                                return (
                                    <div
                                        onClick={() => this.handleViewDetailSpecialty(item.id)}
                                        className='content-body-down'>
                                        <div className='content-child'>
                                            <div className='img-doctor' style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div className='infor-doctor'>
                                                <div className='name-doctor'>
                                                    {item.name}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);
