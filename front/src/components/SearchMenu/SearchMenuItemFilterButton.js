import { useServiceState, useServiceDispatch } from "../../lib/ServiceContext";

const SearchMenuItemFilterButton = ({title, onClick, Key }) => {
    const state = useServiceState();
    const dispatch = useServiceDispatch();
    
    return <button className="Btn Btn-Blue" onClick={onClick}>
            {title}
            {(state.filterData[Key] && state.filterData[Key].length > 0) ?  
                <><span className="InputData-Stroke">{state.filterData[Key]}</span>
                <div onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: Key, payload: "" });}}
                    className="z-20 ml-1 text-gray-500 hover:text-gray-600 w-6 h-6 rounded-full bg-white">
                        &times;
                </div></> : null}
        </button>
};

export default SearchMenuItemFilterButton;
