import { useState } from "react";

import Card from '../components/common/Card';
import AuthPage from "../components/common/AuthPage";
import TimeTable from "../components/TimeTable/TimeTable";
import SearchMenu from "../components/SearchMenu/SearchMenu";

import { weekly, NULL_STR } from "../lib/variables";
import { MENU_OPEN, MENU_CLOSE, useServiceDispatch, useServiceState } from "../lib/ServiceContext";

const TimeTablePage = () => {
    const [ checked, setChecked ] = useState(false);
    
    const state = useServiceState();
    const dispatch = useServiceDispatch();
    
    const getClass = () => {
        dispatch({ type: !state.isMenuOpen ? MENU_OPEN : MENU_CLOSE });
    }

    return <AuthPage>
        <div className="flex flex-row justify-between w-full">
            <label className="m-4 text-2xl flex items-center justify-center w-2/5 max-lg:w-4/5">
                일 단위로 보기&nbsp;
                <input className="w-5 h-5" type="checkbox" checked={checked} onChange={() => setChecked(p => !p)} />
            </label>

            <button className="btn btn-green" onClick={getClass}>과목 추가하기</button>
        </div>
        {!checked ? <TimeTable /> :
            weekly[0].daytime.time.map((v, i) => {
                if(v === NULL_STR) return null;
                return (
                    <Card key={i}>
                        <div>{v}</div>
                    </Card>
                );
            })
        }

        {state.isMenuOpen && (
            <SearchMenu />
        )}
    </AuthPage>
};

export default TimeTablePage;
