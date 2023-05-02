import "../../styles/index.css";
import "../../styles/Card.css";

import { WEEK_HEAD, TIME_HEAD, weekly, NULL_STR } from "../../lib/variables";

import TimeTableCell from "./TimeTableCell";
import TimeTableColumn from "./TimeTableColumn";

import Card from '../common/Card';

const TimeTable = ({ checked }) => {
    return !checked ? 
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
        </div> : 
        weekly[0].daytime.time.map((v, i) => {
            if(v === NULL_STR) return null;
            return (
                <Card key={i}>
                    <div></div>
                </Card>
            );
        });
}

export default TimeTable;
