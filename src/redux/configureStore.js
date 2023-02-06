import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staffs } from "./staffs";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};