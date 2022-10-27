import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i class="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <ul className='center-content'>
                            <li className='child-content'>
                                <a className='subs-title'>
                                    <FormattedMessage id="homeheader.specialty" />
                                    <span><FormattedMessage id="homeheader.searchdoctor" /> </span>
                                </a>
                            </li>
                            <li className='child-content'>
                                <a className='subs-title'>
                                    <FormattedMessage id="homeheader.health-facility" />
                                    <span>
                                        <FormattedMessage id="homeheader.choose-clinic" />
                                    </span>
                                </a>
                            </li>
                            <li className='child-content'>
                                <a className='subs-title'>
                                    <FormattedMessage id="homeheader.doctor" />
                                    <span>
                                        <FormattedMessage id="homeheader.choose-doctor" />

                                    </span>
                                </a>
                            </li>
                            <li className='child-content'>
                                <a className='subs-title'>
                                    <FormattedMessage id="homeheader.fee" />
                                    <span>
                                        <FormattedMessage id="homeheader.check-health" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className='right-content'>
                            <a className='support'>
                                <i class="fas fa-question-circle"></i>
                                <span>
                                    <FormattedMessage id="homeheader.support" />
                                </span>
                                <span className={language === LANGUAGES.VI ? 'language-vi' : ''} onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VI</span>
                                <span className={language === LANGUAGES.EN ? 'language-en' : ''} onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span>


                            </a>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='home-header-search'>
                        <h1><FormattedMessage id="banner.title1" /></h1>
                        <h2><FormattedMessage id="banner.title2" /></h2>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input type='text' placeholder='Khám chuyên khoa' />
                        </div>
                    </div>
                    <div className='home-header-option'>
                        <ul className='option'>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="far fa-hospital"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child1" /></div>
                                </a>
                            </li>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="fas fa-mobile-alt"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child2" /></div>

                                </a>
                            </li>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="fas fa-stethoscope"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child3" /></div>

                                </a>
                            </li>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="fas fa-prescription-bottle"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child4" /></div>

                                </a>
                            </li>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="fas fa-user-md"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child5" /></div>
                                </a>
                            </li>
                            <li className='option-child'>
                                <a>
                                    <div className='child-icon'><i class="fas fa-notes-medical"></i></div>
                                    <div className='child-content'><FormattedMessage id="banner.child6" /></div>

                                </a>
                            </li>
                        </ul>

                    </div>


                </div>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
