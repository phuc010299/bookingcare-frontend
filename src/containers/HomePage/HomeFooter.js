import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class HomeFooter extends Component {

    render() {
        let settings = this.props.settings
        return (
            <div className='home-footer'>
                <p>
                    &copy; 2022 hoangphuc.com
                    <a target='_blank' href='https://www.facebook.com/Phuc9xlatoi/'>  More information, please visit my home page.</a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
