import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';





class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }
    // check sự thay đổi các biến props và gán giá trị lại 
    componentDidUpdate(prevProps) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }


    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)

    }


    render() {
        let { language } = this.props
        let { arrDoctors } = this.state
        let settings = this.props.settings
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container section-outstanding-doctor'>
                    <div className='section-header'>
                        <span><FormattedMessage id="homePage.outstanding-doctor" />
                        </span>
                        <Link to={`/all-doctor`}
                        >
                            <button ><FormattedMessage id="homePage.more-infor" /></button>
                        </Link>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                                return (

                                    <a
                                        className='section-customize section-outstanding-doctor'
                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className='img-customize section-outstanding-doctor'
                                            style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                        <h3>
                                            {language === LANGUAGES.VI ? nameVi : nameEn}


                                        </h3>
                                        <h4>Tiêu hoá</h4>
                                    </a>
                                )
                            })}

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
        language: state.app.language,
        topDoctors: state.admin.topDoctors,
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
