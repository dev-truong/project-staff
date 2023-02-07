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

// Department
export const addDepart = (depart) => ({
    type: ActionTypes.ADD_DEPART,
    payload: depart
});

export const failedDepart = (errmess) => ({
    type: ActionTypes.FAILED_DEPART,
    payload: errmess
});

export const fetchDepart = () => (dispatch) => {
    return fetch(baseUrl + "departments")
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
        .then(depart => dispatch(addDepart(depart)))
        .catch(error => dispatch(failedDepart(error)));
}

// Salary
export const addSalary = (salary) => ({
    type: ActionTypes.ADD_SALARY,
    payload: salary
});

export const failedSalary = (errmess) => ({
    type: ActionTypes.FAILED_SALARY,
    payload: errmess
});

export const fetchSalary = () => (dispatch) => {
    return fetch(baseUrl + "staffsSalary")
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
        .then(salary => dispatch(addSalary(salary)))
        .catch(error => dispatch(failedSalary(error)));
}

// ADD NEWSTAFF
export const addNewStaff = (newstaff) => ({
    type: ActionTypes.ADD_NEWSTAFF,
    payload: newstaff
});

export const postStaff = (newStaff) => (dispatch) => {
    
    return fetch(baseUrl + "staffs", {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then (response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error("Error " + response.status + ":" + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addNewStaff(response)))
    .catch(error => { 
        console.log('post newstaff', error.message);
        alert('Your newstaff could not be posted\nError: ' + error.message);
    });
};