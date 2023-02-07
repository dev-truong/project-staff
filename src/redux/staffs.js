import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = {
        errMess: null,
        isLoading: false,
        staffs: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.LIST_STAFF:
            return {...state, errMess: null, isLoading: false, staffs: action.payload};
        case ActionTypes.FAILED_STAFF:
            return {...state, errMess: action.payload, isLoading: false, staffs: []};
        case ActionTypes.LOADING_STAFF:
            return {...state, errMess: null, isLoading: true, staffs: [] };
        case ActionTypes.ADD_NEWSTAFF:
            return {...state, isLoading: false, staffs: action.payload};
        case ActionTypes.DELETE_STAFF:
            return {...state, staffs: action.payload};
        default:
            return state;
    }
};