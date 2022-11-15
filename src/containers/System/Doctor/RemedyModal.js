import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from "react-toastify";
import moment from 'moment/moment';
import { CommonUtils } from '../../../utils';


class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({ email: this.props.dataModal.email })
        }
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnchangeEmail = (event) => {
        if (event) {
            this.setState({ email: event.target.value })
        }
    }
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0]

        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenRemedyModal, dataModal, closeModal, sendRemedy } = this.props;
        return (
            <Modal
                isOpen={isOpenRemedyModal}
                className="booking-modal-container"
                size='lg'
            >
                <div class="modal-header">
                    <h5 class="modal-title">Send Modal</h5>
                    <button onClick={closeModal}
                        type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>chon don thuoc</label>
                            <input
                                type='email'
                                className='form-control'
                                value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>chon don thuoc</label>
                            <input
                                type='file'
                                className='form-control-file'
                                onChange={(event) => this.handleOnchangeImg(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={closeModal}>Cancel</Button>
                </ModalFooter>
            </Modal>


        )
    }
}


const mapStateToProps = state => {
    return {
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
