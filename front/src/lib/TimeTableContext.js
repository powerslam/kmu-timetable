import { createContext, useReducer } from "react"


const initialState = {};

export const TimeTableContext = createContext(null);

const reducer = (state, action) => {}

export const TimeTableProvider = ({ children }) => {
    const [data, dispatch] = useReducer(reducer, initialState);

    return (
        <TimeTableContext.Provider value={{ data, dispatch }}>
            { children }
        </TimeTableContext.Provider>
    )
}
