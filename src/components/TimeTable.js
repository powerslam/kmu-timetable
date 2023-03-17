import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_str } from '../lib/variables';

const TimeTable = () => {
    return (
        <div>
            <div id="head">
                {
                    week_str.map((v, i) => {
                        return <TimeTableCell isInLine={true} key={i} text={v}/>
                    })
                }
            </div>
            <div id="body">
                <TimeTableColumn />

                <TimeTableColumn />
                <TimeTableColumn />
                <TimeTableColumn />
                <TimeTableColumn />
                <TimeTableColumn />
                <TimeTableColumn />
                <TimeTableColumn />
                
                <TimeTableColumn />    
            </div>
        </div>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
