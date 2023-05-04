import AuthPage from "../components/common/AuthPage";
import Card from "../components/common/Card";

import axios from "axios";
import { useEffect, useState, useRef } from "react";

axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const EmptyClassRoomPage = () => {
    const [floorList, setFloorList] = useState(null);
    const [buildingList, setBuildingList] = useState(null);
    const [classRoomList, setClassRoomList] = useState(null);

    const buildingSelector = useRef();
    const floorSelector = useRef();
    
    useEffect(() => {
        const getBuildingList = async () => {
            const data = await axios.get("https://kmu-timtable-ivort.run.goorm.site/building").then(res => res.data).catch(err => console.log(err));
            setBuildingList(data);
        }

        getBuildingList();
    }, []);

    const getFloorList = (buildingCD) => {
        // 건물을 선택하면서 해당 건물의 층 수를 가져온다.
        // 그래서 층 수 선택자를 초기화 하기 위해 selectedIndex 를 0으로 하고
        // 층 수가 모두 로드되기 전엔 true로 준다.
        floorSelector.current.selectedIndex = 0;
        floorSelector.current.disabled = true;

        // 건물이 달라졌기 때문에 null로 바꾼다
        setClassRoomList(null);

        const getData = async () => {
            const data = await axios.get(`https://kmu-timtable-ivort.run.goorm.site/building/${buildingCD}`)
                .then(res => res.data)
                .then(data => data.map(({ FLOOR }) => FLOOR))
                .catch(err => console.log(err));
            setFloorList(data);

            // 층 수가 모두 로드되면 disabled를 푼다.
            floorSelector.current.disabled = false;
        }
        
        getData();
    };

    const getClassRoomList = (bdg, flr) => {
        const getData = async () => {
            const data = await axios.get(`https://kmu-timtable-ivort.run.goorm.site/building/?bdg=${bdg}&flr=${flr}`)
                .then(res => res.data)
                .then(data => {
                    const rooms = {};

                    data.forEach(({ CLASSROOM_NM, ...classInfo }) => {
                        if(!rooms.hasOwnProperty(CLASSROOM_NM)) rooms[CLASSROOM_NM] = [];
                        rooms[CLASSROOM_NM].push(classInfo);
                    });
                    console.log(rooms);
                    return rooms;
                })
                .catch(err => console.log(err));
            setClassRoomList(data);
        }
        
        getData();
    };

    const onBuildingChange = (e) => {
        // 기본 선택지(건물을 선택하세요)를 고르면
        if(e.target.value === "-11") {
            // 층 수 선택자를 초기화
            floorSelector.current.selectedIndex = 0;
            floorSelector.current.disabled = true;
            setFloorList(null);

            // 아래 화면도 초기화
            setClassRoomList(null);
        } 
        
        // 건물을 골랐을 경우, FloorList를 가져옴
        else getFloorList(e.target.value);
    };

    const onFloorChange = (e) => {
        // 기본 선택지를 고르면 아래 화면을 초기화 한다
        if(e.target.value === "-11") setClassRoomList(null);
        
        // 층을 골랐을 경우 그 층에 맞는 강의실 리스트를 가져온다
        else getClassRoomList(buildingSelector.current.selectedIndex, e.target.value);
    };

    return <AuthPage>
        <div className="flex flex-row items-center justify-end w-1/3 max-lg:w-3/5">
            <select ref={buildingSelector} onChange={onBuildingChange} className="Select-Building">
                <option value="-11">건물을 선택하세요</option>
                {buildingList && buildingList.map(v => (
                    <option key={v.BUILDING_NM} value={v.BUILDING_CD}>{v.BUILDING_NM}</option>
                ))}
            </select>
            
            <select ref={floorSelector} onChange={onFloorChange} className="Select-Building">
                <option value="-11">층을 선택하세요</option>
                {floorList && floorList.map(f => (
                    <option key={f} value={f}>{f < 0 ? `B${-f}` : f}층</option>
                ))}
            </select>
        </div>
        {classRoomList && Object.keys(classRoomList).map(classRoom => {
            return (<Card key={classRoom}>
                <div className="Card-Title">{classRoom}</div>
                <div className="Card-Detail">
                    {
                        classRoomList[classRoom].map(info => {
                            const startTime = `${info.START < 1000 ? "0" : ""}${parseInt(info.START / 100)}:${info.START % 100}${info.START % 100 === 0 ? "0": ""}`;
                            const endTime = `${info.END < 1000 ? "0" : ""}${parseInt(info.END / 100)}:${info.END % 100}${info.END % 100 === 0 ? "0": ""}`;

                            return <div key={info.CLASSROOM_NM} className="flex flex-row justify-items-center my-2">
                                <span className="mx-2">{`${info.SUBJECT_NM} (${info.PROFESSOR})`}</span>
                                <span className="mx-2">{startTime} ~ {endTime}</span>
                            </div>
                        })
                    }
                </div>
            </Card>);
        })}
    </AuthPage>
}

export default EmptyClassRoomPage;
