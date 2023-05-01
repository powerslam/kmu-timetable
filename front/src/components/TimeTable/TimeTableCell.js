import '../../styles/cell.css';

const TimeTableCell = ({text, interval = 1}) => {
    //console.log(`cell cell-h${interval}`);
    return <div className={`cell cell-h${interval}`}>{text}</div>;
}

export default TimeTableCell;
