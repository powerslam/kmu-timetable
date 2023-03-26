import TimeTableCell from './TimeTableCell';
import TimeTableColumn from './TimeTableColumn';

import { week_data, time_data, weekly } from '../../lib/variables';

// TimeTable 이 956 px 이라 이거보다 작아지면 디자인이 다 틀어짐
// 맞춤형으로 너비랑 사이즈가 바뀔 필요가 있음
// 현재 윈도우 사이즈가 956 이하면 % 로 크기를 점점 줄여감
// 일정 크기 

const TimeTable = () => {
    return (
        <table style={{ margin: "auto" }}>
            <tbody>
                <tr>
                    {
                        week_data.map((v, i) => (
                            <td><TimeTableCell key={i} text={v} interval={0.8} verticalCenter={true}/></td>
                        ))
                    }
                </tr>

                <tr>
                    <th><TimeTableColumn data={time_data.alpha} verticalCenter={true}/></th>

                    {
                        weekly.map((v, i) => (
                            <td key={i}><TimeTableColumn data={v} /></td>
                        ))
                    }

                    <th><TimeTableColumn data={time_data.number} verticalCenter={true} /></th>
                </tr>
            </tbody>
        </table>
    );
}

// td 를 TableCell 로 해서 따로 구현하기

export default TimeTable;
