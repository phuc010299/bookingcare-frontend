import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await userService.getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser() {
        this.setState({
            isOpenModalUser: true
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    handleDeleteUser = async (item) => {
        console.log(item.id)
        try {
            let res = await userService.deleteUserService(item.id)
            if (res && res.errCode == 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = async (user) => {
        console.log(user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        console.log('click save user', user)

        try {
            let res = await userService.editUserService(user)
            console.log('check res', res)
            if (res && res.errCode == 0) {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalEditUser: false
                })
            } else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error)
        }
    }
    /** Lifecycle
     * Run component
     * 1. Run constructor -> init state
     * 2. Did mount (set state) (gọi API lấy giá trị và set state, hàm state sẽ set giá trị các biến)
     * 3. Render (re-render)
     */

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParrent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenModalEditUser && <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParrent={this.toggleUserEditModal}
                    curentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                />}


                <div className='title text-center'>Manage with Hoang Phuc</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-4 mx-1'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)} ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
