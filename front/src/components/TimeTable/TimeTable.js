import { useState } from 'react';

import "../../styles/index.css"
import { WEEK_HEAD, TIME_HEAD, weekly } from "../../lib/variables";

import TimeTableCell from "./TimeTableCell";
import TimeTableColumn from "./TimeTableColumn";

import CardList from '../common/CardList';


const TimeTable = () => {
    const [ checked, setChecked ] = useState(false);

    const onChange = (e) => {
        setChecked(!checked);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <label className="m-4"><input type="checkbox" checked={checked} onChange={onChange} /> 일 단위로 보기</label>
            {
                !checked ? 
                    <div className="div-table">
                        <div className="flex flex-row">
                            {WEEK_HEAD.map((v, i) => (
                                <TimeTableCell key={i} text={v}/>
                            ))}
                        </div>
                        
                        <div className="flex flex-row">
                            <TimeTableColumn data={TIME_HEAD.alpha.daytime}/>
                            
                            <TimeTableColumn data={weekly[0].daytime} />

                            <TimeTableColumn data={TIME_HEAD.number.daytime}/>
                        </div>
                    </div> : <CardList />
            }
        </div>
    );
}

export default TimeTable;
