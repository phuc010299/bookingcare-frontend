import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils'
// import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser.js';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            user: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''

            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGender = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            let arrRole = this.props.roleRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE

            })
        }
    }

    handleOnchangeImg = (event) => {
        let data = event.target.files;
        let file = data[0]

        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return
        this.setState({
            isOpen: true
        })
    }



    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid === false) return
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUserRedux({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserStart({
                id: this.state.userId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
            })
        }


    }

    checkValidInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                alert('Missing required field: ' + arrCheck[i])
                isValid = false
                break
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value.trimLeft('')
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        console.log('check handle edit user from parent', user)
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            userId: user.id,
            // avatar: user.avatar,
            action: CRUD_ACTIONS.EDIT
        })
    }


    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'><FormattedMessage id="manage-user.add" /></div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                        value={email}
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                        value={password}
                                        onChange={(event) => this.onChangeInput(event, 'password')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label ><FormattedMessage id='manage-user.first-name' /></label>
                                    <input type="text" className="form-control" placeholder="First name"
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}

                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Last name"
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}

                                    />
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className="form-group col-md-3" >
                                    <label for="inputAddress"><FormattedMessage id='manage-user.phone-number' /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="(+84)"
                                        value={phoneNumber}
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="form-group col-md-9" >
                                    <label for="inputAddress"><FormattedMessage id='manage-user.address' /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')}

                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label for="inputState"><FormattedMessage id='manage-user.gender' /></label>
                                    <select id="inputState" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'gender')}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {
                                                            language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                        }</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-md-4">
                                    <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                                    <select id="inputState" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'role')}
                                        value={position}

                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>
                                                )


                                            })
                                        }
                                    </select>
                                </div>

                                <div className="form-group col-md-4">
                                    <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                                    <select id="inputState" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'position')}
                                        value={role}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{
                                                        language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                    }</option>

                                                )


                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className='form-row'>
                                <div className="form-group col-md-6" >
                                    <label for="inputAddress"><FormattedMessage id='manage-user.image' /></label>
                                    <div className='preview-img-container'>
                                        <input type="file" id="previewImg" hidden
                                            onChange={(event) => this.handleOnchangeImg(event)}

                                        />
                                        <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                        <div
                                            className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImg()}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <button type='button'
                                className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning my-5 px-2" : "btn btn-primary my-5 px-2"}
                                onClick={() => this.handleSaveUser()}
                            >{this.state.action === CRUD_ACTIONS.EDIT ?
                                <FormattedMessage id='manage-user.edit' />
                                :
                                <FormattedMessage id='manage-user.save' />
                                }
                            </button>
                        </form>
                        <div className='form-row mb-5'>
                            <TableManageUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />}

            </div>


        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
        editUserStart: (data) => dispatch(actions.editUserStart(data))
        // fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
