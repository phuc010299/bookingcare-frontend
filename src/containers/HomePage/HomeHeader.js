import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import userService from '../../services/userService';



class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
            selectSpecialty: '',
        }
    }

    async componentDidMount() {
        let res = await userService.getAllSpecialties()
        if (res && res.errCode === 0) {

            let arrSpecialty = this.buildDataListSpecialty(res.data)
            this.setState({
                arrSpecialty: arrSpecialty
            })
        }

    }

    buildDataListSpecialty(data) {
        let results = []
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.value = item.id
                object.label = item.name
                results.push(object)
            })

        }
        return results
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    handleOnchangeSelect = (selectSpecialty) => {
        this.setState({ selectSpecialty })
    }
    handleOnclickSearch = (id) => {
        if (this.props.history) {

            this.props.history.push(`/detail-specialty/${id}`)
        }
        console.log(`Search`, this.props.history)

    }
    render() {
        let language = this.props.language
        let { arrSpecialty, selectSpecialty } = this.state
        console.log('check arrSpecialty', arrSpecialty)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <Link to={`/home`}>
                                {/* <i className="fas fa-bars"></i> */}
                                <div className='header-logo'></div>
                            </Link>
                        </div>
                        <ul className='center-content'>
                            <li className='child-content'>
                                <Link to={'/all-specialty'}
                                    className='subs-title'>
                                    <FormattedMessage id="homeheader.specialty" />
                                    <span><FormattedMessage id="homeheader.searchdoctor" /></span>
                                </Link>
                            </li>
                            <li className='child-content'>
                                <Link to={'/all-clinic'}
                                    className='subs-title'>
                                    <FormattedMessage id="homeheader.health-facility" />
                                    <span>
                                        <FormattedMessage id="homeheader.choose-clinic" />
                                    </span>
                                </Link>
                            </li>
                            <li className='child-content'>
                                <Link to={'/all-doctor'}
                                    className='subs-title'>
                                    <FormattedMessage id="homeheader.doctor" />
                                    <span>
                                        <FormattedMessage id="homeheader.choose-doctor" />
                                    </span>
                                </Link>
                            </li>
                            {/* <li className='child-content'>
                                <a className='subs-title'>
                                    <FormattedMessage id="homeheader.fee" />
                                    <span>
                                        <FormattedMessage id="homeheader.check-health" />
                                    </span>
                                </a>
                            </li> */}
                        </ul>
                        <div className='right-content'>
                            <a className='support'>
                                <i className="fas fa-question-circle"></i>
                                <span>
                                    <FormattedMessage id="homeheader.support" />
                                </span>
                                <span className={language === LANGUAGES.VI ? 'language-vi' : ''} onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VI</span>
                                <span className={language === LANGUAGES.EN ? 'language-en' : ''} onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span>
                            </a>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner &&
                    <div className='home-header-banner'>
                        <div className='home-header-search'>
                            <h1><FormattedMessage id="banner.title1" /></h1>
                            <h2><FormattedMessage id="banner.title2" /></h2>
                            <div className='search'>
                                <Link
                                    to={`/detail-specialty/${selectSpecialty.value}`}>
                                    <i
                                        className="fas fa-search"
                                    ></i>

                                </Link>
                                <div
                                    className="form-control home-header-select"
                                >
                                    <Select
                                        value={selectSpecialty}
                                        options={arrSpecialty}
                                        onChange={this.handleOnchangeSelect}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className='home-header-option'>
                            <ul className='option'>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="far fa-hospital"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child1" /></div>
                                    </a>
                                </li>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="fas fa-mobile-alt"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child2" /></div>

                                    </a>
                                </li>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="fas fa-stethoscope"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child3" /></div>

                                    </a>
                                </li>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="fas fa-prescription-bottle"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child4" /></div>

                                    </a>
                                </li>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="fas fa-user-md"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child5" /></div>
                                    </a>
                                </li>
                                <li className='option-child'>
                                    <a>
                                        <div className='child-icon'><i className="fas fa-notes-medical"></i></div>
                                        <div className='child-content'><FormattedMessage id="banner.child6" /></div>

                                    </a>
                                </li>
                            </ul>

                        </div>


                    </div>}
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
