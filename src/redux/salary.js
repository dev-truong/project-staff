import * as ActionTypes from "./ActionTypes";

export const Salary = (state = {
        errMess: null,
        salary: []
    }, action) => {
        switch (action.type) {
            case ActionTypes.ADD_SALARY:
                return {...state, errMess: null, salary: action.payload};
            case ActionTypes.FAILED_SALARY:
                return {...state, errMess: action.payload, salary: []};
            default:
                return state;
        }
};