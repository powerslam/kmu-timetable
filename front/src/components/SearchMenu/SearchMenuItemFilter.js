import '../../styles/SearchMenu.css';

import { useState } from 'react';
import TextInputModal from './TextInputModal';
import CheckInputModal from './CheckInputModal';
import { SUBJECT_NM, PROFESSOR, WEEK, useServiceDispatch } from '../../lib/ServiceContext';

import SearchMenuItemFilterButton from './SearchMenuItemFilterButton';

const SearchMenuItemFilter = ({ onClose }) => {
    const [openBit, setOpenBit] = useState(0);

    const SUB = 1, PRO = 2, WEK = 4;
    const dispatch = useServiceDispatch();

    return <div className="MenuFilter">
                <div className="MenuBtn-Container">
                    <SearchMenuItemFilterButton 
                        title={"과목명 : "}
                        Key={SUBJECT_NM}
                        onClick={() => {
                            if(openBit !== 0) return;
                            setOpenBit(openBit | SUB);
                        }}/>

                    <SearchMenuItemFilterButton 
                        title={"교수님 : "}
                        Key={PROFESSOR}
                        onClick={() => {
                            if(openBit !== 0) return;
                            setOpenBit(openBit | PRO);
                        }}/>

                    <SearchMenuItemFilterButton 
                        title={"요일 : "}
                        Key={WEEK}
                        onClick={() => {
                            if(openBit !== 0) return;
                            setOpenBit(openBit | WEK);
                        }}/>
                </div>
                <button className="MenuBtn CloseBtn" onClick={onClose}>닫기</button>
            
                <TextInputModal
                    title="과목명 검색"
                    placeholder="과목명"
                    isOpen={openBit === SUB}
                    onSubmit={(data) => {dispatch({ type: SUBJECT_NM, payload: data })}}
                    onClose={() => setOpenBit(0)}
                />

                <TextInputModal title="교수님 성함 검색"
                    placeholder="교수님 성함"
                    isOpen={openBit === PRO}
                    onSubmit={(data) => {dispatch({ type: PROFESSOR, payload: data })}}
                    onClose={() => setOpenBit(0)}
                />

                <CheckInputModal title="학년"
                    isOpen={openBit === WEK}
                    onClose={() => setOpenBit(0)}
                    onSubmit={(data) => {dispatch({ type: WEEK, payload: data })}}
                    options={[
                        { label: "일요일", value: 1},
                        { label: "월요일", value: 2},
                        { label: "화요일", value: 3},
                        { label: "수요일", value: 4},
                        { label: "목요일", value: 5},
                        { label: "금요일", value: 6},
                        { label: "토요일", value: 7},
                    ]}
                />
            </div>
};

export default SearchMenuItemFilter;
