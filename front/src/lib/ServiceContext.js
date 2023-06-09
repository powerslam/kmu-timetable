import { createContext, useContext, useReducer } from "react"

export const SUBJECT_NM = "SUBJECT_NM";
export const PROFESSOR = "PROFESSOR";
export const WEEK = "WEEK";

const initialState = {
    isLogin: !!localStorage.getItem('id'),
    menuData: null,

    filterData: {
        [SUBJECT_NM]: "",
        [PROFESSOR]: "",
        [WEEK]: []
    },

    tmpSelectSbjs: null,
    selectSbjs: [],
};

export const INITIAL_DATA = "INITIAL_DATA";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const IS_LOGIN = "IS_LOGIN";

export const UPDATE_MENU_ITEMS = "UPDATE_MENU_ITEMS";
export const INPUT_SUBJECT_NAME = "INPUT_SUBJECT_NAME";

export const TMP_SELECT_SUBJECT = "TMP_SELECT_SUBJECT";
export const INITAILIZE_TIMETABLE = "INITAILIZE_TIMETABLE";
export const INSERT_SBJ_TO_TIMETABLE = "INSERT_SBJ_TO_TIMETABLE";
export const DELETE_SBJ_FROM_TIMETABLE = "DELETE_SBJ_FROM_TIMETABLE";

const reducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case INITIAL_DATA:
            return initialState;

        case LOGIN: 
            localStorage.clear();
            localStorage.setItem('id', payload.id);
            localStorage.setItem('pwd', payload.pwd);
            return { 
                ...state,
                isLogin: true
            };
                
        case LOGOUT:
            localStorage.clear();
            return { 
                ...state,
                isLogin: false
            };

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

        case PROFESSOR:
            return {
                ...state,
                filterData: {
                    ...state.filterData,
                    [PROFESSOR]: payload,
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
        
        case TMP_SELECT_SUBJECT:
            return {
                ...state,
                tmpSelectSbjs: payload,
            };
        
        case INITAILIZE_TIMETABLE:
            return {
                ...state,
                selectSbjs: payload,
            };

        case INSERT_SBJ_TO_TIMETABLE:
            return {
                ...state,
                tmpSelectSbjs: null,
                selectSbjs: [
                    ...state.selectSbjs,
                    state.tmpSelectSbjs
                ],
            };

        case DELETE_SBJ_FROM_TIMETABLE:
            return {
                ...state,
                tmpSelectSbjs: null,
                selectSbjs: state.selectSbjs.filter(v => v !== payload),
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
