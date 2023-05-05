import '../../styles/SearchMenu.css';

import axios from 'axios';

import { useEffect } from 'react';

import { UPDATE_MENU_ITEMS, useServiceState, useServiceDispatch } from '../../lib/ServiceContext';

import SearchMenuItemFilter from './SearchMenuItemFilter';
import SearchMenuHeader from './SearchMenuHeader';
import SearchMenuItem from './SearchMenuItem';

const SearchMenu = ({ onClose }) => {
    const state = useServiceState();
    const dispatch = useServiceDispatch();

    const WeekStr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    useEffect(() => {
        const queryString = Object.keys(state.filterData).filter(v => state.filterData[v].length !== 0).map(v => `${v}=${encodeURIComponent(state.filterData[v])}`).join('&');

        (async () => {
            const res = await axios.get("https://kmu-timtable-ivort.run.goorm.site/class" + (queryString ? `/?${queryString}` : ""))
                .then(res => res.data)
                .catch(err => console.error(err));
            dispatch({ type: UPDATE_MENU_ITEMS, payload: res });
        })();
    }, [state.filterData]);

    return <div className="Search-Menu">
        <SearchMenuItemFilter onClose={onClose} />
        <SearchMenuHeader />
        <ul className="w-full h-full text-center overflow-auto Scroll">
            {state.menuData && Object.keys(state.menuData).map(data => {
                const {
                    SUBJECT_CD, SUBJECT_NM, CREDIT, PROFESSOR, REMARK, WEEK // WEEK 는 나중에 같은 과목일 경우 합쳐지는 걸로
                } = state.menuData[data];

                let {
                    START, END
                } = state.menuData[data];
                
                START = ((START < 1000) ? "0" : "") + `${parseInt(START / 100)}:`
                            + ((START % 100 === 0) ? "0" : "") + `${parseInt(START % 100)}`;

                END = ((END < 1000) ? "0" : "") + `${parseInt(END / 100)}:`
                            + ((END % 100 === 0) ? "0" : "") + `${parseInt(END % 100)}`;

                return <SearchMenuItem key={SUBJECT_CD + WEEK} grade={3} week={WeekStr[WEEK - 1]} sbjNM={SUBJECT_NM} sbjCD={SUBJECT_CD} division={SUBJECT_CD.split('-')[1]} credit={CREDIT} professor={PROFESSOR} time={`${START} ~ ${END}`} remark={REMARK}/>
            })}
        </ul>
    </div>
};

export default SearchMenu;
