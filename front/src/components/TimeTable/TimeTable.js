import { useState } from 'react';

import "../../styles/index.css";
import "../../styles/Card.css";

import { WEEK_HEAD, TIME_HEAD, weekly, NULL_STR } from "../../lib/variables";

import TimeTableCell from "./TimeTableCell";
import TimeTableColumn from "./TimeTableColumn";

import Card from '../common/Card';


const TimeTable = () => {
    const [ checked, setChecked ] = useState(false);

    const onChange = () => {
        setChecked(!checked);
    }

    return (
        <div className="w-full h-fit flex flex-col items-center justify-center m-auto">
            <label className="m-4 text-2xl flex items-center justify-center w-2/5 max-lg:w-4/5">
                일 단위로 보기&nbsp;
                <input className="w-5 h-5" type="checkbox" checked={checked} onChange={onChange} />
            </label>
            {!checked 
                ? <div className="div-table">
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
                  </div> 
                : weekly[0].daytime.time.map((v, i) => {
                    if(v === NULL_STR) return null;
                    return (
                        <Card key={i}>
                            <div></div>
                        </Card>
                    );
                })
            }
        </div>
    );
}

export default TimeTable;
