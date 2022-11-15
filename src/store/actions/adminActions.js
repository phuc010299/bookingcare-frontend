import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from "react-toastify";


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await userService.getAllcodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))

            } else {
                dispatch(fetchGenderFailed())

            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart', error)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

// position

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))

            } else {
                dispatch(fetchPositionFailed())

            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionFailed', error)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})


// role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService('ROLE')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            return error
            dispatch(fetchRoleFailed())

        }

    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})


// create user
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUserService(data);
            console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                toast.success("CREATE A NEW USER SUCCESS");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())

            } else {
                dispatch(saveUserfailed())
            }
        } catch (error) {
            return error
            dispatch(saveUserfailed())

        }

    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})

export const saveUserfailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUsers('All')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            return error
            dispatch(fetchAllUserFailed())

        }

    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})



export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(id)

            if (res && res.errCode === 0) {
                toast.success("DELETE A USER SUCCESS");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                dispatch(deleteUserSuccess())

            } else {
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(deleteUserFailed())
            return error
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.editUserService(data)

            if (res && res.errCode === 0) {
                toast.success("EDIT USER SUCCESS");
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())

            } else {
                toast.error("EDIT USER SUCCESS");
                dispatch(editUserFailed())
            }
        } catch (error) {
            toast.error("EDIT USER SUCCESS");
            dispatch(editUserFailed())
            return error
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getTopDoctorHome('8')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }

        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })

        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataAllDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }

        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })

        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.saveDetailDoctors(data)
            if (res && res.errCode === 0) {
                toast.success("SAVE DEATAIL DOCTOR SUCCESS");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            } else {
                toast.error("SAVE DEATAIL DOCTOR FAILED");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
                })
            }

        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED
            })

        }
    }
}

export const fetchAllcodeScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }

        } catch (error) {
            console.log(error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })

        }
    }
}


export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await userService.getAllcodeService("PRICE")
            let resPayment = await userService.getAllcodeService("PAYMENT")
            let resProvince = await userService.getAllcodeService("PROVINCE")
            let resClinic = await userService.getAllClinics()
            let resSpecialty = await userService.getAllSpecialties()


            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getRequiredDoctorInforSuccess(data))
            } else {
                dispatch(getRequiredDoctorInforSuccessFailed())

            }
        } catch (error) {
            dispatch(getRequiredDoctorInforSuccessFailed())
            console.log('fetchGenderStart', error)
        }
    }
}

export const getRequiredDoctorInforSuccess = (allRequiredDoctorData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredDoctorData
})

export const getRequiredDoctorInforSuccessFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})
