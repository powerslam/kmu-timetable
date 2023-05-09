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
                    DEPT_CD, CATEGORY_CD, // 학과 및 과목 분류 정보
                    SUBJECT_CD, SUBJECT_NM, // 과목 정보
                    CREDIT, PROFESSOR, REMARK // 기타 정보
                } = state.menuData[data];

                let {
                    BUILDING_NM, FLOOR, CLASSROOM_NM, // 강의실 정보
                    START, END, WEEK, GRADE
                } = state.menuData[data];
                
                START = START.split(',').map(v => {
                    v = parseInt(v);
                    const hour = parseInt(v / 100);
                    const minute = v % 100;
                    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                });

                END = END.split(',').map(v => {
                    v = parseInt(v);
                    const hour = parseInt(v / 100);
                    const minute = v % 100;
                    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                });

                const TIME = WEEK.split(',').map((v, i) => {
                    return [parseInt(v), `${WeekStr[parseInt(v) - 1]} - ${START[i]} ~ ${END[i]}`];
                }).sort().map(v => v[1]).join('\n');
                
                BUILDING_NM = BUILDING_NM.split(',');
                
                FLOOR = FLOOR.replaceAll("-", "지하");
                FLOOR = FLOOR.split(',');
                
                CLASSROOM_NM = CLASSROOM_NM.split(',');

                const CLASSROOM_INFO = FLOOR.map((_, i) => {
                    return `${BUILDING_NM[i]} ${FLOOR[i]}층 ${CLASSROOM_NM[i]}`;
                })

                if(GRADE.length > 1) GRADE = GRADE[0] + " - " + GRADE[GRADE.length - 1];

                return <SearchMenuItem key={SUBJECT_CD} 
                    onClick={() => {dispatch({ type: TMP_SELECT_SUBJECT, payload: {...state.menuData[data], BG_COLOR: `${Colors[Math.floor(Math.random() * 5)]}`} })}}
                    deptCD={getUniversityName(DEPT_CD)} categoryCD={getCategoryName(CATEGORY_CD)} grade={GRADE} sbjNM={SUBJECT_NM} sbjCD={SUBJECT_CD} 
                    division={SUBJECT_CD.split('-')[1]} classRoomInfo={CLASSROOM_INFO.join('\n')} credit={CREDIT} professor={PROFESSOR} time={TIME} remark={REMARK}/>
            })}
        </ul>
    </div>
};

export default SearchMenu;
