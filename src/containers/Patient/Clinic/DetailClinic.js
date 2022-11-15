import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils'
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss';
import DoctorSchedule from '../doctor/DoctorSchedule';
import DoctorExtraInfor from '../doctor/DoctorExtraInfor';
import ProfileDoctor from '../doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';



class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await userService.getDetailClinic(id)
            if (res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })

            }
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                    &&
                    <div className='description-specialty'
                    // style={{ backgroundImage: `url(${dataDetailClinic.image ? dataDetailClinic.image : ''})` }}
                    >
                        <div className='description-specialty-image'
                            style={{ backgroundImage: `url(${dataDetailClinic.image ? dataDetailClinic.image : ''})` }}
                        ></div>
                        <div className='description-specialty-name' >{dataDetailClinic.name}</div>
                        <div
                            className='description-specialty-content' dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}
                        >
                        </div>
                    </div>
                }
                <div className='detail-specialty-body'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
