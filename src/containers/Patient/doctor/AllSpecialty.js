import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './AllSpecialty.scss';
import './DoctorSchedule.scss'
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils'; //
import { FormattedMessage } from 'react-intl';




class AllSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
            selectDoctor: '',
            listSpecialty: ''
        }
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialties()
        if (res && res.errCode === 0) {
            this.setState({
                arrSpecialty: res.data,
                selectDoctor: ''
            })
        }

        let { arrSpecialty } = this.state

        let listSpecialty = await this.buildDataInputSelect(arrSpecialty)
        this.setState({
            listSpecialty: listSpecialty
        });
    }

    buildDataInputSelect = (inputdata) => {
        let { language } = this.props
        let results = []
        if (inputdata && inputdata.length > 0) {
            inputdata.map(item => {
                let object = {}
                object.label = item.name
                object.value = item.id
                results.push(object)
            })
        }
        return results
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            let { arrSpecialty } = this.state
            let listSpecialty = await this.buildDataInputSelect(arrSpecialty)
            this.setState({
                listSpecialty: listSpecialty
            });
        }
    }

    handleViewDetailSpecialty = (id) => {
        // this.props.history.push(`/detail-specialty/${id}`)
        console.log('chec handleViewDetailSpecialty ', this.props.history)
    }


    render() {
        let { arrSpecialty, listSpecialty } = this.state
        let { language } = this.props
        console.log('check arrSpecialty', arrSpecialty)

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
                            {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item, index) => {
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
                            <FormattedMessage id="patient.all-specialty.choose-specialty" />

                        </div>
                        {arrSpecialty && arrSpecialty.length > 0
                            && arrSpecialty.map((item, index) => {

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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
