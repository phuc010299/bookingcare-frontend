import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

// import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllUserRedux()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser(user) {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser(user) {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.usersRedux

        return (
            <React.Fragment>
                <table>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}  ><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}  ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table >
                {/* <MdEditor style={{ height: '500px', width: '1120px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
