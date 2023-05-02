import { createContext, useContext, useReducer } from "react"

const initialState = {
    isLogin: !!localStorage.getItem('id'),
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const IS_LOGIN = "IS_LOGIN";

const reducer = (state, action) => {
    const { type, userData } = action;

    switch(type) {
        case LOGIN: 
            localStorage.clear();
            localStorage.setItem('id', userData.id);
            localStorage.setItem('pwd', userData.pwd);
            return { isLogin: true };
                
        case LOGOUT:
            localStorage.clear();
            return { isLogin: false };
    
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