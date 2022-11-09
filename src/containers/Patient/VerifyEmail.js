import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './VerifyEmail.scss';
import userService from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';



class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlPrams = new URLSearchParams(this.props.location.search)
            let token = urlPrams.get('token')
            let doctorId = urlPrams.get('doctorId')

            let res = await userService.postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            console.log('check response: ', res)
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true
                })
            }
        }

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {

        }
    }
    render() {
        let { statusVerify } = this.state
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify ?
                        <div className='infor-booking'>
                            Xác nhận lịch hẹn thành công
                        </div>

                        :
                        <div className='infor-booking'>
                            Lịch hẹn không tồn tại hoặc đã được xác nhận
                        </div>
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
