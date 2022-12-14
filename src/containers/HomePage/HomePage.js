import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import OutstandingDoctor from './Section/OutstandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import { Redirect, Route, Switch } from 'react-router-dom';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './HomePage.scss';

class HomePage extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };
        return (
            <>
                <Switch>

                    <div>
                        <HomeHeader isShowBanner={true} />
                        <Specialty settings={settings} />
                        <MedicalFacility settings={settings} />
                        <OutstandingDoctor settings={settings} />
                        <About />
                        <HomeFooter />

                    </div>

                    <Redirect to={'/home'} />
                </Switch>

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
