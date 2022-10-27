import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'




class Specialty extends Component {

    render() {
        let settings = this.props.settings
        console.log('check settings', settings)

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Chuyên khoa kỹ thuật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a href='#' className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-specialty'> </div>
                                <h3>
                                    Cơ xương khớp
                                </h3>
                            </a>


                        </Slider>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
