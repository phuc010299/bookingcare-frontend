import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick'
import userService from '../../../services/userService';
import { withRouter } from 'react-router-dom';




class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialties()
        console.log('check res: ', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    }


    render() {
        let settings = this.props.settings
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span><FormattedMessage id="homePage.specialty-popular" /></span>
                        <button><FormattedMessage id="homePage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div
                                            className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='img-customize section-specialty' style={{ backgroundImage: `url(${item.image})` }}> </div>
                                            <h3 >
                                                {item.name}
                                            </h3>
                                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
