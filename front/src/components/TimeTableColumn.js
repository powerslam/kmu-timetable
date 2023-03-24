import TimeTableCell from "./TimeTableCell";
import styles from '../styles/TimeTable.module.css';


const TimeTableColumn = ({ data }) => {
    const { time, interval } = data;

    return (
        <div className={styles.inline}>
            {   
                data ? time.daytime.map((v, i) => {
                    return <TimeTableCell 
                        key={i}
                        interval={interval.daytime[i]}
                        text={v}
                    />
                }) : ''
            }
        </div>
    )
}

export default TimeTableColumn;
