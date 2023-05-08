import '../../styles/SearchMenu.css';

import axios from 'axios';

import { useEffect } from 'react';

import { UPDATE_MENU_ITEMS, useServiceState, useServiceDispatch, TMP_SELECT_SUBJECT } from '../../lib/ServiceContext';

import SearchMenuItemFilter from './SearchMenuItemFilter';
import SearchMenuHeader from './SearchMenuHeader';
import SearchMenuItem from './SearchMenuItem';

import { getUniversityName, getCategoryName } from '../../lib/variables';

const SearchMenu = ({ onClose }) => {
    const state = useServiceState();
    const dispatch = useServiceDispatch();

    const WeekStr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const Colors = ["--pastel_yellow", "--pastel_purple", "--pastel_pink", "--pastel_green", "--pastel_lightgreen"];

    useEffect(() => {
        const queryString = Object.keys(state.filterData).filter(v => state.filterData[v].length !== 0).map(v => `${v}=${encodeURIComponent(state.filterData[v])}`).join('&');

        (async () => {
            const res = await axios.get("https://kmu-timtable-ivort.run.goorm.site/class" + (queryString ? `/?${queryString}` : ""))
                .then(res => res.data)
                .catch(err => console.error(err));
            dispatch({ type: UPDATE_MENU_ITEMS, payload: res });
        })();
    }, [state.filterData]);

    // 가져올 때 주간만 가져오도록
    return <div className="Search-Menu">
        <div className="MenuHeader-Container MenuHeader-Position">
            <SearchMenuItemFilter onClose={onClose} />
            <SearchMenuHeader />
        </div>
        <ul className="MenuItem-Container MenuItem-Position Scroll">
            {state.menuData && Object.keys(state.menuData).map(data => {
                const {
                    DEPT_CD, CATEGORY_CD, SUBJECT_CD, SUBJECT_NM, CREDIT, PROFESSOR, REMARK
                } = state.menuData[data];

                let {
                    START, END, WEEK, GRADE
                } = state.menuData[data];
                
                START = START.split(',').map(v => {
                    v = parseInt(v);
                    return ((v < 1000) ? "0" : "") + `${parseInt(v / 100)}:`
                            + ((v % 100 === 0) ? "0" : "") + `${parseInt(v % 100)}`;
                });
                END = END.split(',').map(v => {
                    v = parseInt(v);
                    return ((v < 1000) ? "0" : "") + `${parseInt(v / 100)}:`
                            + ((v % 100 === 0) ? "0" : "") + `${parseInt(v % 100)}`;
                });

                WEEK = WEEK.split(',').map(v => WeekStr[parseInt(v) - 1]);

                const TIME = START.map((_, i) => {
                    return `${WEEK[i]} - ${START[i]} ~ ${END[i]}`;
                }).join('\n');

                if(GRADE.length > 1) GRADE = GRADE[0] + " - " + GRADE[GRADE.length - 1];

                return <SearchMenuItem key={SUBJECT_CD} 
                    onClick={() => {dispatch({ type: TMP_SELECT_SUBJECT, payload: {...state.menuData[data], BG_COLOR: `${Colors[Math.floor(Math.random() * 5)]}`} })}}
                    deptCD={getUniversityName(DEPT_CD)} categoryCD={getCategoryName(CATEGORY_CD)} grade={GRADE} sbjNM={SUBJECT_NM} sbjCD={SUBJECT_CD} 
                    division={SUBJECT_CD.split('-')[1]} credit={CREDIT} professor={PROFESSOR} time={TIME} remark={REMARK}/>
            })}
        </ul>
    </div>
};

export default SearchMenu;
