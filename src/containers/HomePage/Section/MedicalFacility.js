import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'




class MedicalFacility extends Component {

    render() {
        let settings = this.props.settings
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a href='#' className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
                                </h3>
                            </a>
                            <a className='section-customize'>
                                <div className='img-customize section-medical-facility'> </div>
                                <h3>
                                    Bệnh viện hữu nghị Việt Đức
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
