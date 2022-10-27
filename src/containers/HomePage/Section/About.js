import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';




class About extends Component {

    render() {
        let settings = this.props.settings
        console.log('check settings', settings)

        return (
            <div className='section-share section-about'>
                <div className='section-container section-about'>
                    <div className='section-header'>
                        <span>Truyền thông nói về BookingCare</span>
                    </div>
                    <div className='section-content'>
                        <div className='content-left'>
                            <iframe width="570" height="321"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        </div>

                        <div className='content-right'>

                            <a className='media' target='_blank' href='https://ictnews.vietnamnet.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict'>
                                <div class="ictnews"></div>
                            </a>
                            <a className='media' target='_blank' href='https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm' >
                                <div class="vtv1"></div>

                            </a>
                            <a className='media' target='_blank' href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html' >
                                <div class="vnexpress"></div>
                            </a>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
