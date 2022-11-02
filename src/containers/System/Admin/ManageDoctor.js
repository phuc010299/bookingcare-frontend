import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils'

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            arrDoctors: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
    }

    buildDataInputSelect = (inputData) => {

        let results = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                results.push(object)
            })
        }
        return results
    }



    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                arrDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                arrDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };

    handleSaveContentMarkdown() {
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })

        // contentHTML: inputData.contentHTML,
        //         contentMarkdown: inputData.contentMarkdown,
        //         description: inputData.description,
        //         doctorId: inputData.doctorId
        console.log('check handleSaveContentMarkdown', this.state.selectedDoctor.value)
    }



    handleOnchangeDesc(event) {
        this.setState({
            description: event.target.value
        })
    }


    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-infor'>

                    <div className='content-left form-group'>
                        <label >Chọn bác sĩ</label>
                        <Select
                            defaultValue={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.arrDoctors}
                        />

                    </div>

                    <div className='content-right form-group'>
                        <label >Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event) => this.handleOnchangeDesc(event)}
                            value={this.state.description}

                        ></textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-content-doctor'>
                    Lưu thông tin
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
