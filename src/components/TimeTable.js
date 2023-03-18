import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_str, time_str } from '../lib/variables';

const TimeTable = () => {
    return (
        <div>
            <div 
                id="body">
                <TimeTableColumn data={time_str.alpha} />
                <TimeTableColumn data={time_str.number} />
            </div>
        </div>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
