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
        const getData = async () => {
            const data = await axios.get(`https://kmu-timtable-ivort.run.goorm.site/building/${buildingCD}`)
                .then(res => res.data)
                .then(data => data.map(({ FLOOR }) => FLOOR))
                .catch(err => console.log(err));
            setFloorList(data);
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

                    return rooms;
                })
                .catch(err => console.log(err));
            setClassRoomList(data);
        }
        
        getData();
    };

    const onBuildingChange = (e) => {
        // 기본 선택지를 고르면
        if(e.target.value === "-11") {
            floorSelector.current.selectedIndex = 0;
            floorSelector.current.disabled = true;
            setFloorList(null);
            setClassRoomList(null);
        } 
        
        // 건물을 골랐을 경우
        else {
            floorSelector.current.selectedIndex = 0;
            floorSelector.current.disabled = false;
            getFloorList(e.target.value);
        }
    };

    const onFloorChange = (e) => {
        // 기본 선택지를 고르면
        if(e.target.value === "-11") setClassRoomList(null);
        
        // 층을 골랐을 경우
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
            return (
                <Card key={classRoom}>
                    <div className="Card-Title">{classRoom}</div>
                    <div className="Card-Detail">
                        {
                            classRoomList[classRoom].map(info => (
                                <div className="flex flex-row justify-items-center my-2">
                                    <span className="mx-2">{info.SUBJECT_NM}</span>
                                    <span className="mx-2">{parseInt(info.START.match(/\d+/)[0]) + 8}:{(info.START.split(/\d+/)[1] === 'B' ? '30' : '00')}</span>
                                    <span className="mx-2">{info.TIME}교시</span>
                                </div>
                            ))
                        }

                        <div className="flex flex-row justify-items-center my-2">
                            <div className="Card-Detail-Stroke">
                            </div>
                            <span className="mx-2">남았습니다.</span>
                        </div>
                    </div>
                </Card>
            );
        })}
    </AuthPage>
}

export default EmptyClassRoomPage;
