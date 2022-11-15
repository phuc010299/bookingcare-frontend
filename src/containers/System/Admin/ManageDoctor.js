import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import userService from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // save to markdown
            contentHTML: '',
            contentMarkdown: '',
            selectDoctor: '',
            description: '',
            arrDoctors: '',
            hasOldData: false,

            // save to doctor infor table
            listPrice: '',
            listPayment: '',
            listProvince: '',
            listClinic: '',
            listSpecialty: '',
            listClinic: '',

            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            selectClinic: '',
            selectSpecialty: '',
            selectClinic: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.getRequiredDoctorInfor()
    }

    buildDataInputSelect = (inputData, type) => {
        let results = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'DOCTOR') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    results.push(object)
                })
            }
            if (type === "PRICE") {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = `${item.valueEn} $`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    results.push(object)
                })
            }
            if (type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    results.push(object)
                })
            }

            if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    results.push(object)
                })
            }

            if (type === "CLINIC") {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    results.push(object)
                })
            }






        }
        return results
    }

    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'DOCTOR')
            this.setState({
                arrDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")
            let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")


            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'DOCTOR')
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE")
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")
            let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")


            this.setState({
                arrDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic


            })

        }



    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleChangeSelect = async (selectDoctor) => {
        let { language } = this.props
        this.setState({ selectDoctor });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state
        let res = await userService.getDetailInforDoctor(selectDoctor.value)
        let Markdown = res.data.Markdown
        let Doctor_infor = res.data.Doctor_infor
        if (Doctor_infor) {
            let selectPayment = listPayment.find(item => {
                if (item.value === Doctor_infor.paymentId) return item
            })
            let selectPrice = listPrice.find(item => {
                if (item.value === Doctor_infor.priceId) return item
            })
            let selectProvince = listProvince.find(item => {
                if (item.value === Doctor_infor.provinceId) return item
            })
            let selectSpecialty = listSpecialty.find(item => {
                if (item.value === Doctor_infor.specialtyId) return item
            })
            let selectClinic = listClinic.find(item => {
                if (item.value === Doctor_infor.clinicId) return item
            })
            this.setState({
                selectPrice: selectPrice,
                selectPayment: selectPayment,
                selectProvince: selectProvince,
                nameClinic: Doctor_infor.nameClinic,
                addressClinic: Doctor_infor.addressClinic,
                note: Doctor_infor.note,
                selectSpecialty: selectSpecialty,
                selectClinic: selectClinic
            })
        } else {
            this.setState({
                nameClinic: "",
                addressClinic: "",
                note: "",
                selectPrice: '',
                selectPayment: '',
                selectProvince: '',
                selectSpecialty: '',
                selectClinic: '',
            })
        }
        if (Markdown) {
            this.setState({
                description: Markdown.description,
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleSaveContentMarkdown() {
        let { hasOldData } = this.state
        console.log('check state:', this.state)
        // return
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectPrice: this.state.selectPrice.value,
            selectPayment: this.state.selectPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.selectClinic.label,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectClinic && this.state.selectClinic.value ? this.state.selectClinic.value : "",
            specialtyId: this.state.selectSpecialty.value

        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            hasOldData: false,
            selectPrice: '',
            selectPayment: '',
            selectProvince: '',
            selectClinic: '',
            selectSpecialty: '',
            selectClinic: '',
        })
    }



    handleOnchangeText(event, id) {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }


    render() {
        let { hasOldData } = this.state
        // console.log('check state', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor row'>
                    <div className='content-left col-4  form-group'>
                        <label ><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.arrDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className='content-right col-8 form-group'>
                        <label ><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            name="selectPrice"
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectPayment"
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectProvince"
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>{<FormattedMessage id="admin.manage-doctor.select-clinic" />}</label>
                        <Select
                            value={this.state.selectClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectClinic"
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}

                        />
                    </div>
                    {/* <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            value={this.state.nameClinic}
                            onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                        // placeholder={<FormattedMessage id="admin.manage-doctor.nameClinic" />}

                        />
                    </div> */}
                    <div className='col-8 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            value={this.state.addressClinic}
                            onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                        // placeholder={<FormattedMessage id="admin.manage-doctor.addressClinic" />}

                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>{<FormattedMessage id="admin.manage-doctor.specialty" />}</label>
                        <Select
                            value={this.state.selectSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectSpecialty"
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}

                        />
                    </div>
                    <div className='col-8 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            value={this.state.note}
                            onChange={(event) => this.handleOnchangeText(event, 'note')}
                        // placeholder={<FormattedMessage id="admin.manage-doctor.note" />}
                        />
                    </div>

                </div>

                <div className='row'>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData ? 'save-content-doctor' : 'create-content-doctor  btn-primary'}>
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                        : <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    }
                </button>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
