import { TIME_HEAD, WEEK_HEAD } from '../lib/variables';
import { INSERT_SBJ_TO_TIMETABLE, DELETE_SBJ_FROM_TIMETABLE, useServiceDispatch, useServiceState } from '../lib/ServiceContext';
import { useEffect } from 'react';

import axios from 'axios';

import '../styles/TimeTable.css';

const TimeTable = () => {
    const state = useServiceState();
    const dispatch = useServiceDispatch();

    useEffect(() => {
        // 비교할 게 없으니까
        if(state.tmpSelectSbjs){
            let canUpdate = true;
            for(let i = 0; i < state.selectSbjs.length; i++){
                // 같은 과목인 경우? DB 업데이트 후
                // if(state.selectSbjs[i].SUBJECT_CD === state.tmpSelectSbjs.SUBJECT_CD) break;
                if(state.selectSbjs[i].WEEK !== state.tmpSelectSbjs.WEEK) continue;

                // 시간대가 겹치는 경우
                // - 1 tmpSelectSbjs 의 START가 사이에 끼는 경우
                if(state.selectSbjs[i].START <= state.tmpSelectSbjs.START && state.tmpSelectSbjs.START < state.selectSbjs[i].END){
                    canUpdate = false;
                    break;
                }

                // - 2 tmpSelectSbjs 의 END가 사이에 끼는 경우
                if(state.selectSbjs[i].START < state.tmpSelectSbjs.END && state.tmpSelectSbjs.END <= state.selectSbjs[i].END){
                    canUpdate = false;
                    break;
                }
            }
            if(canUpdate) {
                const id = localStorage.getItem('id');
                const sbjCD = state.tmpSelectSbjs.SUBJECT_CD;
                const week = state.tmpSelectSbjs.WEEK;
                const bgColor = state.tmpSelectSbjs.BG_COLOR;

                (async () => {
                    await axios.post("https://kmu-timtable-ivort.run.goorm.site/timetable", {
                        ID: id,
                        SUBJECT_CD: sbjCD,
                        WEEK: week, BG_COLOR: bgColor,
                    }).then(res => {
                        // 만약에 500 안뜨면 DB에 들어간거니까 update
                        dispatch({ type: INSERT_SBJ_TO_TIMETABLE });
                        return res.data;
                    }).catch(err => console.error(err));
                })();
            } else alert("다른 과목과 시간이 겹칩니다!!");
        }
    }, [state.tmpSelectSbjs]);

    const onDeleteSubject = (info) => {
        const id = localStorage.getItem('id');
        const sbjCD = info.SUBJECT_CD;
        const week = info.WEEK;
        const queryString = `/?id=${id}&sbjCD=${sbjCD}&week=${week}`;

        (async () => {
            await axios.delete("https://kmu-timtable-ivort.run.goorm.site/timetable" + queryString).then(res => {
                // 만약에 500 안뜨면 DB에서 삭제된거니까 delete
                dispatch({ type: DELETE_SBJ_FROM_TIMETABLE, payload: info });
                return res.data;
            }).catch(err => console.error(err));
        })();
    }

    return <div className="Grid-Container Grid-Layout">
        {Array(18 * 7).fill(1).map((_, rc) => {
            return <div key={rc} 
                className="Common Grid-Item"
                style={{
                    gridColumnStart: rc % 7 + 2, // 2 ~ 8
                    gridRowStart: parseInt(rc / 7) + 2,
                }} />
        })}

        {WEEK_HEAD.map((v, i) => {
            return <div key={v+i} 
                className="Common Grid-Item"
                style={{
                    gridColumnStart: i + 1,
                    gridRowStart: 1,
                }}>{v}</div>
        })}

        {TIME_HEAD.alpha.daytime.time.map((v, i) => {
            return <div key={v} 
                className="Common Grid-Item"
                style={{
                    gridColumnStart: 1,
                    gridRowStart: i + 2,
                }}>{v}</div>
        })}

        {TIME_HEAD.number.daytime.time.map((v, i) => {
            return <div key={v} 
                className="Common Grid-Item"
                style={{
                    gridColumnStart: 9,
                    gridRowStart: i + 2,
                }}>{v}</div>
        })}

        { !state.selectSbjs ? null : (
            state.selectSbjs.map(info => {
                const START = info.START.split(',');
                const END = info.END.split(',');
                const columnStart = info.WEEK.split(',');
                return START.map((_, i) => {
                    // row는 1부터 시작이고, header가 있어서 1 더해줌
                    const rowStart = (parseInt(START[i] / 100) - 8) * 2 + (START[i] % 100 === 30 ? 1 : 0);
            
                    // 그리고 30분이 있으면 한 칸 아래로 내려 가야 함
                    const rowEnd = (parseInt(END[i] / 100) - 8) * 2 + (END[i] % 100 === 30 ? 1 : 0);

                    return <div key={info.SUBJECT_CD + columnStart[i]} 
                        style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid black",
                            backgroundColor: `var(${info.BG_COLOR})`,
                            gridColumnStart: parseInt(columnStart[i]) + 1,
                            gridRowStart: rowStart,
                            gridRowEnd: rowEnd}}>
                        <div style={{height: "20px"}}>
                            <button style={{
                                backgroundColor: "transparent",
                                position: "absolute",
                                top: "-4px", right: "4px",
                                height: "20px", width: "20px",
                            }} onClick={() => onDeleteSubject(info)}>
                                &times;
                            </button>
                        </div>

                        <div>{info.SUBJECT_NM}</div>
                    </div>
                });
            })
        )}
    </div>
}

export default TimeTable;
