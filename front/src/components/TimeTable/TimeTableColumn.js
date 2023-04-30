import TimeTableCell from "./TimeTableCell";

const TimeTableColumn = ({ data }) => {
    const { time, interval } = data;
    console.log(time);
    return (
        <div>
            {time.map((v, i) => (
                <TimeTableCell key={v} text={v} interval={interval[i]}/>
            ))}
        </div>
    )
}

export default TimeTableColumn;
