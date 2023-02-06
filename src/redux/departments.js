import * as ActionTypes from "./ActionTypes";

export const Depart = (state = {
        errMess: null,
        depart: []
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPART:
            return {...state, errMess: null, depart: action.payload};
        case ActionTypes.FAILED_DEPART:
            return {...state, errMess: action.payload, depart: []};
        default:
            return state;
    }
};