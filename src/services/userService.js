import axios from '../axios';

const userService = {
    handleLoginApi(email, password) {
        return axios.post('/api/login', { email, password });
    },

    getAllUsers(inputId) {
        return axios.get(`/api/get-all-users?id=${inputId}`);
    },

    createNewUserService(data) {
        return axios.post('/api/create-new-user', data);

    },

    deleteUserService(userId) {
        return axios.delete('/api/delete-user', { data: { id: userId } });

    },

    editUserService(user) {
        return axios.put('/api/edit-user', user);

    },
    getAllcodeService(inputType) {
        return axios.get(`/api/allcode?type=${inputType}`);

    },
    getTopDoctorHome(limit) {
        return axios.get(`/api/top-doctor-home?limit=${limit}`)
    },
    getAllDoctors() {
        return axios.get(`/api/get-all-doctors`)
    },
    // router.post('/api/save-infor-doctors', doctorController.postInforDoctors)
    saveDetailDoctors(data) {
        return axios.post('/api/save-infor-doctors', data)
    },
    getDetailInforDoctor(id) {
        return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
    },
    bulkCreateSchedule(data) {
        return axios.post('/api/bulk-create-schedule', data)
    },
    // router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    getScheduleByDate(doctorId, date) {
        return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
    },
    getExtraInforDoctorById(doctorId) {
        return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
    },
    getProfileDoctorById(doctorId) {
        return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
    },
    postPatientBookAppointment(data) {
        return axios.post('/api/patient-book-appointment', data)
    },
    postVerifyBookAppointment(data) {
        return axios.post('/api/verify-book-appointment', data)
    },
    createSpecialty(data) {
        return axios.post('/api/create-new-specialty', data)
    },
    getAllSpecialties() {
        return axios.get('/api/get-all-specialties')
    },
    getDetailSpecialty(id, location) {
        return axios.get(`/api/get-detail-specialty-by-id?id=${id}&&location=${location}`)
    },
    createClinic(data) {
        return axios.post('/api/create-new-clinic', data)
    },
    getAllClinics() {
        return axios.get('/api/get-all-clinic')
    },
    getTopClinic(limit) {
        return axios.get(`/api/get-top-clinic?limit=${limit}`)
    },
    getDetailClinic(id) {
        return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
    },
    getListPatientForDoctor(doctorId, date) {
        return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&&date=${date}`)
    },
    postSendRemedy(data) {
        return axios.post('/api/send-remedy', data)
    },
}


export default userService;