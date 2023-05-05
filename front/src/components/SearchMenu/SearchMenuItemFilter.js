import '../../styles/SearchMenu.css';

import { useState } from 'react';
import TextInputModal from './TextInputModal';
import CheckInputModal from './CheckInputModal';
import { SUBJECT_NM, GRADE, WEEK, useServiceDispatch, useServiceState } from '../../lib/ServiceContext';

const SearchMenuItemFilter = ({ onClose }) => {
    const [openBit, setOpenBit] = useState(0);

    const SUB = 1, GRA = 2, WEK = 4;
    
    const state = useServiceState();
    const dispatch = useServiceDispatch();

    return (
        <div className="MenuFilter mt-2">
            <div className="flex flex-row">
                <button className="Btn Btn-Blue" onClick={() => {
                        if(openBit !== 0) return;
                        setOpenBit(openBit | SUB);}}>
                    {"과목명 : "}
                    {!state.filterData[SUBJECT_NM] ? null:
                        <><span className="InputData-Stroke">{state.filterData[SUBJECT_NM]}</span>
                            <div onClick={(e) => {
                                e.stopPropagation();
                                dispatch({ type: SUBJECT_NM, payload: "" });
                            }}
                                className="z-20 ml-1 text-gray-500 hover:text-gray-600 w-6 h-6 rounded-full bg-white">
                                    &times;
                            </div></>}
                </button>
            
                <button className="Btn Btn-Blue" onClick={() => {
                        if(openBit !== 0) return;
                        setOpenBit(openBit | GRA);}}>
                    {"학년 : "}
                    {!state.filterData[GRADE].length ? null:
                        <><span className="InputData-Stroke">
                            {state.filterData[GRADE].join(', ')}
                        </span>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: GRADE, payload: "" });
                        }}
                            className="z-20 ml-1 text-gray-500 hover:text-gray-600 w-6 h-6 rounded-full bg-white">
                                &times;
                        </div></>}
                </button>

                <button className="Btn Btn-Blue" onClick={() => {
                        if(openBit !== 0) return;
                        setOpenBit(openBit | WEK);}}>
                    {"요일 : "}
                    {!state.filterData[WEEK].length ? null:
                        <><span className="InputData-Stroke">
                            {state.filterData[WEEK].map(v => ["", "일", "월", "화", "수", "목", "금", "토"][v]).join(', ')}
                        </span>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: WEEK, payload: "" });
                        }}
                            className="z-20 ml-1 text-gray-500 hover:text-gray-600 w-6 h-6 rounded-full bg-white">
                                &times;
                        </div></>}
                </button>
            </div>
            <button className="Btn Btn-Orange" onClick={onClose}>닫기</button>
            

            <TextInputModal
                title="과목명 검색"
                placeholder="과목명"
                isOpen={openBit === SUB}
                onSubmit={(data) => {dispatch({ type: SUBJECT_NM, payload: data })}}
                onClose={() => setOpenBit(0)}
            />

            <CheckInputModal
                title="학년"
                isOpen={openBit === GRA}
                onClose={() => setOpenBit(0)}
                onSubmit={(data) => {dispatch({ type: GRADE, payload: data })}}
                options={[
                    { label: "1학년", value: 1},
                    { label: "2학년", value: 2},
                    { label: "3학년", value: 3},
                    { label: "4학년", value: 4},
                ]}
            />

            <CheckInputModal
                title="학년"
                isOpen={openBit === WEK}
                onClose={() => setOpenBit(0)}
                onSubmit={(data) => {dispatch({ type: WEEK, payload: data })}}
                options={[
                    { label: "월요일", value: 2},
                    { label: "화요일", value: 3},
                    { label: "수요일", value: 4},
                    { label: "목요일", value: 5},
                    { label: "금요일", value: 6},
                    { label: "토요일", value: 7},
                    { label: "일요일", value: 1},
                ]}
            />
        </div>
    )
};

export default SearchMenuItemFilter;
