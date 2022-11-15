import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LANGUAGES, USER_ROLE } from '../utils/constant'
import _ from 'lodash';
import { adminMenu, doctorMenu } from '../containers/Header/menuApp';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: ''
        }
    }


    componentDidMount = () => {
        let menu = []
        let { userInfo } = this.props
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId

            if (role === USER_ROLE.ADMIN) {
                menu = '/system/user-redux'
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = '/doctor/manage-patient'
            }
            this.setState({
                menuApp: menu
            })
        }
    }
    render() {
        const { isLoggedIn } = this.props;
        let { menuApp } = this.state
        let linkToRedirect = isLoggedIn ? menuApp : '/login';

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
