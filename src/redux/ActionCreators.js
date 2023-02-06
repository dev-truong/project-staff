import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

//Staff List
export const listStaff = (staff) => ({
    type: ActionTypes.LIST_STAFF,
    payload: staff
});

export const failedStaff = (errmess) => ({
    type: ActionTypes.FAILED_STAFF,
    payload: errmess
});

export const loadingStaff = () => ({
    type: ActionTypes.LOADING_STAFF
});

export const fetchStaffs = () => (dispatch) => {
    dispatch(loadingStaff(true));

    return fetch(baseUrl + "staffs")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error("Error" + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(staff => dispatch(listStaff(staff)))
        .catch(error => dispatch(failedStaff(error)));
}
