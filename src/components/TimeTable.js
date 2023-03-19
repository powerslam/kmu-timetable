import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_str, time_str } from '../lib/variables';

const TimeTable = () => {
    return (
        <table>
            <tbody>
                <tr>
                    <th><TimeTableColumn data={time_str.alpha} /></th>
                    <th><TimeTableColumn data={time_str.number} /></th>
                </tr>
            </tbody>
        </table>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
