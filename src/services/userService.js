import axios from '../axios';
import * as queryString from 'query-string';

const userService = {
    handleLoginApi(email, password) {
        return axios.post('/api/login', { email, password });
    },

    getAllUsers(inputId) {
        return axios.get(`/api/get-all-users?id=${inputId}`);
    },

    createNewUserService(data) {
        console.log('check data from service', data);
        return axios.post('/api/create-new-user', data);

    },

    deleteUserService(userId) {
        return axios.delete('/api/delete-user', { data: { id: userId } });

    },

    editUserService(user) {
        return axios.put('/api/edit-user', user);

    }


}


export default userService;