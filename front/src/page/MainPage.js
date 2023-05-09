import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_SERVER, LOGIN_PATH } from "../lib/variables";
import { useServiceState, useServiceDispatch, LOGOUT, INITAILIZE_TIMETABLE } from "../lib/ServiceContext";

import Card from "../components/common/Card";

import axios from "axios";

import "../styles/MainPage.css";
import "../styles/Card.css";

const MainPage = () => {
    const navigate = useNavigate();
    const { isLogin } = useServiceState();
    const [ userId, setUserId ] = useState('');
    const [ classList, setClassList ] = useState([]);

    const state = useServiceState();
    const dispatch = useServiceDispatch();

    useEffect(() => {
        if(!isLogin) {
            setUserId('');
            navigate(LOGIN_PATH);
        } else setUserId(localStorage.getItem('id'));
    }, [isLogin]);

    useEffect(() => {
        if(userId){
            (async () => {
                await axios.get(API_SERVER + `/timetable/${userId}`)
                    .then(res => {
                        dispatch({ type: INITAILIZE_TIMETABLE, payload: res.data });
                }).catch(err => console.error(err));
            })();
        }
    }, [userId]);

    useEffect(() => {
        if(state.selectSbjs.length > 0) {
            setClassList(
                // state.selectSbjs -> 시간표에 등록된 수업
                state.selectSbjs.filter(
                    // @param: WEEK -> 수업 A가 배치된 요일 / START -> 수업 A의 시작 시각
                    // 조건 : 1) 오늘 수업이 아니라면 false
                    //        2) 시작 시각이 현재 시각을 지났다면 false
                    // => 최종적으로는 두 조건 중 하나를 만족하면 필터링된다.
                    ({WEEK, START}) => {
                        const today = new Date();
                        const idx = WEEK.split(',').indexOf((today.getDay() + 1).toString());
                        
                        // 오늘이 아니면 제외
                        if(idx === -1) return false;

                        const startHour = parseInt(parseInt(START.split(',')[idx]) / 100);
                        const startMin = parseInt(START.split(',')[idx]) % 100;
                        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMin);
                        
                        // 원하는 요일이긴 한데 과목이 이미 시작했으면 제외
                        if(today.getTime() > start.getTime()) return false; 
                        
                        return true;
                    }
                ).map(({WEEK, SUBJECT_NM, PROFESSOR, BUILDING_NM, FLOOR, CLASSROOM_NM, START, END}) => {
                    const idx = WEEK.split(',').indexOf((new Date().getDay() + 1).toString());
                    
                    const start = START.split(',')[idx];
                    const end = END.split(',')[idx];

                    const startTime = `${START < 1000 ? "0" : ""}${parseInt(start / 100)}:${start % 100}${start % 100 === 0 ? "0": ""}`;
                    const endTime = `${end < 1000 ? "0" : ""}${parseInt(end / 100)}:${end % 100}${end % 100 === 0 ? "0": ""}`;

                    return {
                        SUBJECT_NM: SUBJECT_NM, 
                        PROFESSOR: PROFESSOR,
                        CLASSROOM_INFO: `${BUILDING_NM.split(',')[idx]} ${FLOOR.split(',')[idx].replace("-", "지하")}층 ${CLASSROOM_NM.split(',')[idx]}`,
                        START: startTime,
                        END: endTime
                    };
                }).sort((a, b) => a.START - b.START) // 시작 시간이 빠른 순으로 정렬
            );
        }
    }, [state.selectSbjs]);

    const onLogout = () => {
        dispatch({ type: LOGOUT });
        navigate(LOGIN_PATH);
    }

    return !isLogin ? null : (
        <div className="MainPage Scroll">
            <div className="UserInfo-Container Content-Container-Size">
                <div className="UserManagementBtn-Container">
                    <span className="UserIdText">{userId}</span>
                    <button className="btn bg-lightgreen" onClick={onLogout}>
                        로그아웃
                    </button>
                </div>

                <table>
                    <caption className="Link-Title">국민대 서비스 바로가기</caption>
                    <tbody><tr><td><button 
                        className="btn bg-green Link-Btn"
                        onClick={() => window.open('https://portal.kookmin.ac.kr/por/mn', '_blank')}>
                            온국민
                    </button></td>
                    <td><button 
                        className="btn bg-green Link-Btn"
                        onClick={() => window.open('https://ecampus.kookmin.ac.kr/login/index.php', '_blank')}>
                            eCampus
                    </button></td></tr>
                    
                    <tr><td><button 
                        className="btn bg-green Link-Btn"
                        onClick={() => window.open('https://www.kookmin.ac.kr/user/unIntr/campusGuide/bukakCampusGuide/index.do', '_blank')}>
                            국민대 근처 교통정보
                    </button></td>
                        <td><button 
                        className="btn bg-green Link-Btn"
                        onClick={() => window.open('https://ecampus.kookmin.ac.kr/login/index.php', '_blank')}>
                            성곡도서관
                    </button></td></tr></tbody>
                </table>
            </div>

            <div className="TodayClass">
                <span className="TodayClass-Title">오늘의 수업</span>
                <div className="Content-Container Content-Container-Size">
                {!classList.length ?
                    <span className="MainPage-Card-NoContent">
                        🎉 오늘 남은 수업이 없습니다. 🎉
                    </span> : 
                    <div className="TodayClass-CardList">
                        {classList.map(({SUBJECT_NM, PROFESSOR, START, END, CLASSROOM_INFO}) => {
                            return <Card key={START}>
                                <div className="Card-Title Card-Title-Text-Size">
                                    {SUBJECT_NM}
                                </div>

                                <div className="Card-Detail Card-Detail-Margin">
                                    <span className="MainPage-Card-Content">{PROFESSOR}</span>
                                    <span className="MainPage-Card-Content">{CLASSROOM_INFO}</span>
                                    <span className="MainPage-Card-Content">{`${START} ~ ${END}`}</span>
                                </div>
                            </Card>})}
                    </div>}
                </div>
            </div>
        </div>)
}

export default MainPage;