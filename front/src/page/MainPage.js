import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "../lib/variables";
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
                await axios.get(`https://kmu-timtable-ivort.run.goorm.site/timetable/${userId}`).then(res => {
                    dispatch({ type: INITAILIZE_TIMETABLE, payload: res.data });
                }).catch(err => console.error(err));
            })();
        }
    }, [userId]);

    useEffect(() => {
        if(state.selectSbjs.length > 0) {
            setClassList(
                state.selectSbjs.filter(
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
                ).map(info => {
                    const idx = info.WEEK.split(',').indexOf((new Date().getDay() + 1).toString());
                    return {
                        SUBJECT_NM: info.SUBJECT_NM, 
                        PROFESSOR: info.PROFESSOR, 
                        START: parseInt(info.START.split(',')[idx]),
                        END: parseInt(info.END.split(',')[idx])
                    };
                }).sort((a, b) => a.START - b.START)
            );
        }
    }, [state.selectSbjs]);

    const onLogout = () => {
        dispatch({ type: LOGOUT });
        navigate(LOGIN_PATH);
    }

    return !isLogin ? null : (
        <div className="MainPage Scroll">
            <div className="UserInfo-Container">
                <span className="UserIdText">{userId}</span>
                    
                <div className="UserManagementBtn-Container">
                    <button className="btn bg-lightgreen">
                        회원관리
                    </button>
                    
                    <button className="btn bg-lightgreen" onClick={onLogout}>
                        로그아웃
                    </button>
                </div>
            </div>

            <div className="TodayClass">
                <span className="TodayClass-Title">오늘의 수업</span>
                <div className="Content-Container Content-Container-Size">
                {!classList.length ?
                    <span className="MainPage-Card-NoContent">
                        🎉 오늘 남은 수업이 없습니다. 🎉
                    </span> : 
                    <div className="TodayClass-CardList">
                        {classList.map(({SUBJECT_NM, PROFESSOR, START, END}) => {
                            return <Card key={START}>
                                <div className="Card-Title Card-Title-Text-Size">
                                    {SUBJECT_NM}
                                </div>

                                <div className="Card-Detail Card-Detail-Margin">
                                    <span className="MainPage-Card-Content">{PROFESSOR}</span>
                                    <span className="MainPage-Card-Content">{`${START} ~ ${END}`}</span>
                                </div>
                            </Card>})}
                    </div>}
                </div>
            </div>
        </div>)
}

export default MainPage;