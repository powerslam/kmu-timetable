import { useState } from "react";
import TimeTable from "../components/TimeTable/TimeTable";

import AuthPage from "../components/common/AuthPage";

const TimeTablePage = () => {
    const [ checked, setChecked ] = useState(false);
    
    return <AuthPage>
        <label className="m-4 text-2xl flex items-center justify-center w-2/5 max-lg:w-4/5">
            일 단위로 보기&nbsp;
            <input className="w-5 h-5" type="checkbox" checked={checked} onChange={() => setChecked(p => !p)} />
        </label>
        <TimeTable checked={checked} />        
    </AuthPage>
};

export default TimeTablePage;
