import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'




class Handbook extends Component {

    render() {
        let settings = this.props.settings
        return (
            <div className='section-share section-handbook'>
                <div className='section-container section-handbook'>
                    <div className='section-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
                                </h3>
                            </a>
                            <a className='section-customize section-handbook'>
                                <div className='img-customize section-handbook'> </div>
                                <h3>
                                    Khám Tại Trung Tâm Tiêu Hoá Doctor Check
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
