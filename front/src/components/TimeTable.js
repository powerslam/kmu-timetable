import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_data, time_data, weekly } from '../lib/variables';

const TimeTable = () => {
    return (
        <table style={{ margin: "auto" }}>
            <tbody>
                <tr>
                    {
                        week_data.map((v, i) => {
                            return <td><TimeTableCell key={i} text={v} interval={0.8} verticalCenter={true}/></td>
                        })
                    }
                </tr>

                <tr>
                    <th><TimeTableColumn data={time_data.alpha} verticalCenter={true}/></th>

                    {
                        weekly.map((v, i) => {
                            return <td key={i}><TimeTableColumn data={v} /></td>
                        })
                    }

                    <th><TimeTableColumn data={time_data.number} verticalCenter={true} /></th>
                </tr>
            </tbody>
        </table>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
