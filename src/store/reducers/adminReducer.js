import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            return {
                ...state,
            }
        // Position
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;

            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            }

        // Role
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        //FETCH_ALL_USER_SUCCESS
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.roles = [];
            return {
                ...state,
            }

        // FETCH_TOP_DOCTORS
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }

        // FETCH_ALL_DOCTORS
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataAllDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,
            }
        // SAVE_DETAIL_DOCTORS
        case actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.SAVE_DETAIL_DOCTORS_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;