import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.curentUser
        console.log('component edit user', this.props)
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'user.password',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            });
        }

    }
    toggle = () => {
        this.props.toggleFromParrent()
    };

    handleOnchangeInput = (event, id) => {

        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ["email", "password", "firstName", "lastName", "address"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('missing required parameter: ' + arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid) {
            this.props.editUser(this.state)

        }
    }

    render() {
        return (
            <div>
                {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button> */}
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className='modal-user-container'
                    size='lg'
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <div className='row'>
                                <div className="form-group col-md-6">
                                    <label >Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-md-6">
                                    <label >First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phuc"
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label >Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nguyen"
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnchangeInput(event, 'lastName')}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="1234 Tran Hung Dao"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className='px-2'
                            color="primary"
                            onClick={() => { this.handleSaveUser() }}
                        >Save changes</Button>{' '}
                        <Button className='px-2' color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
