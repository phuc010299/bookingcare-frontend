import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import userService from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrClinic: [],
        }
    }

    componentDidMount = async () => {
        let res = await userService.getTopClinic('8')
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data ? res.data : [],
            })
        }
    }

    handleViewDetailClinic(clinic) {
        console.log('this click')
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }

    }

    render() {
        let settings = this.props.settings
        let { arrClinic } = this.state
        return (
            <div className='section-share section-medical-facility' >
                <div className='section-container'>
                    <div className='section-header'>
                        <span><FormattedMessage id="homePage.outstanding-medical-facility" /></span>

                        <Link to={'/all-clinic'}
                        >
                            <button><FormattedMessage id="homePage.more-infor" /></button>
                        </Link>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {arrClinic && arrClinic.length > 0 &&
                                arrClinic.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <a
                                            className='section-customize'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className='img-customize section-medical-facility' style={{ backgroundImage: `url(${imageBase64})` }}> </div>
                                            <h3>
                                                {item.name}
                                            </h3>
                                        </a>
                                    )
                                })
                            }


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
