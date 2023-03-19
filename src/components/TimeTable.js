import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_data, time_data, null_data, sample_data } from '../lib/variables';

const TimeTable = () => {
    return (
        <table style={{ margin: "auto" }}>
            <tbody>
                <tr>
                    {
                        week_data.map((v, i) => {
                            return <td><TimeTableCell key={i} text={v} interval={0.5}/></td>
                        })
                    }
                </tr>

                <tr>
                    <th><TimeTableColumn data={time_data.alpha} /></th>
                    
                    <td><TimeTableColumn data={sample_data} /></td>

                    {
                        Array(6).fill(1).map((_, i) => {
                            return <td key={i}><TimeTableColumn data={null_data} /></td>
                        })
                    }

                    <th><TimeTableColumn data={time_data.number} /></th>
                </tr>
            </tbody>
        </table>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
