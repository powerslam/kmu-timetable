import { createContext, useContext, useReducer } from "react"

export const SUBJECT_NM = "SUBJECT_NM";
export const GRADE = "GRADE";
export const WEEK = "WEEK";

const initialState = {
    isLogin: !!localStorage.getItem('id'),
    menuData: null,

    filterData: {
        [SUBJECT_NM]: "",
        [GRADE]: [],
        [WEEK]: []
    }
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const IS_LOGIN = "IS_LOGIN";

export const UPDATE_MENU_ITEMS = "UPDATE_MENU_ITEMS";
export const INPUT_SUBJECT_NAME = "INPUT_SUBJECT_NAME";

const reducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN: 
            localStorage.clear();
            localStorage.setItem('id', payload.id);
            localStorage.setItem('pwd', payload.pwd);
            return { isLogin: true };
                
        case LOGOUT:
            localStorage.clear();
            return { isLogin: false };

        case UPDATE_MENU_ITEMS:
            return {
                ...state,
                menuData: payload,
            };

        case SUBJECT_NM:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    [SUBJECT_NM]: payload,
                }
            };

        case GRADE:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    [GRADE]: payload,
                }
            };

        case WEEK:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    [WEEK]: payload,
                }
            };
        
        default: return state;
    }
}

const ServiceStateContext = createContext(null);
const ServiceDispatchContext = createContext(null);

export const ServiceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ServiceStateContext.Provider value={state}>
            <ServiceDispatchContext.Provider value={dispatch}>
                { children }
            </ServiceDispatchContext.Provider>
        </ServiceStateContext.Provider>
    )
};

export const useServiceState = () => {
    const state = useContext(ServiceStateContext);
    if(!state) throw new Error("Cannot find UserProvider");
    return state;
};

export const useServiceDispatch = () => {
    const dispatch = useContext(ServiceDispatchContext);
    if(!dispatch) throw new Error("Cannot find UserProvider");
    return dispatch;
};
