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
    }


}


export default userService;