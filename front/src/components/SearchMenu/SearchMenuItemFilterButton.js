import { useServiceState, useServiceDispatch } from "../../lib/ServiceContext";

const SearchMenuItemFilterButton = ({title, onClick, Key }) => {
    const state = useServiceState();
    const dispatch = useServiceDispatch();
    
    return <button className="MenuBtn FilterBtn" onClick={onClick}>
            <span className="FilterBtn-Title">{title}</span>
            {(state.filterData[Key] && state.filterData[Key].length > 0) ?  
                <><div className="Modal-InputData-Stroke">{typeof(state.filterData[Key]) === 'object' ? state.filterData[Key].join(', ') : state.filterData[Key]}</div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: Key, payload: "" });}}
                    className="FilterClearBtn">
                        &times;
                </div></> : null}
        </button>
};

export default SearchMenuItemFilterButton;
