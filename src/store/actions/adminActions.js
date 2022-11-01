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


// let res1 = await userService.getTopDoctorHome(3);