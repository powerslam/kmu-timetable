import axios from 'axios';

import { useState, useEffect } from "react";

import AuthPage from "../components/common/AuthPage";
import TimeTable from "../components/TimeTable/TimeTable";
import SearchMenu from "../components/SearchMenu/SearchMenu";

import { INITAILIZE_TIMETABLE, useServiceDispatch } from '../lib/ServiceContext';

const TimeTablePage = () => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const dispatch = useServiceDispatch();
    
    useEffect(() => {
        const id = localStorage.getItem("id");
        (async () => {
            await axios.get(`https://kmu-timtable-ivort.run.goorm.site/timetable/${id}`).then(res => {
                dispatch({ type: INITAILIZE_TIMETABLE, payload: res.data });
            }).catch(err => console.error(err));
        })();
    }, []);

    return <AuthPage>
        <div className="flex flex-row w-2/3 lg:justify-end max-lg:justify-center">
            <button className="btn btn-green" onClick={() => setIsMenuOpen(p => !p)}>과목 추가하기</button>
        </div>

        <TimeTable />
        
        { !isMenuOpen ? null : <SearchMenu onClose={() => setIsMenuOpen(false)} /> }
    </AuthPage>
};

export default TimeTablePage;
