import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import DoctorSchedule from '../doctor/DoctorSchedule';
import DoctorExtraInfor from '../doctor/DoctorExtraInfor';
import ProfileDoctor from '../doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';



class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await userService.getDetailSpecialty(id, "ALL")
            let resProvince = await userService.getAllcodeService('PROVINCE')
            if (res && resProvince && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })

            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
    }

    async handleOnchangeSelect(event) {
        let location = event.target.value
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await userService.getDetailSpecialty(id, location)
            let resProvince = await userService.getAllcodeService('PROVINCE')

            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }

                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }

            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props


        console.log('check dataDetailSpecialty', dataDetailSpecialty.image)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                    &&
                    <div className='description-specialty'
                    // style={{ backgroundImage: `url(${dataDetailSpecialty.image ? dataDetailSpecialty.image : ''})` }}
                    >
                        <div className='description-specialty-image'
                            style={{ backgroundImage: `url(${dataDetailSpecialty.image ? dataDetailSpecialty.image : ''})` }}
                        ></div>
                        <div className='description-specialty-content' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    </div>
                }
                <div className='detail-specialty-body'>

                    <div className='search-specialty-doctor'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (<option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueVi}
                                    </option>)
                                })
                            }
                        </select>
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor ' key={index} >
                                    <div className='dt-content-left '>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //  dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right '>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
