import TimeTableCell from "./TimeTableCell";
import styles from '../../styles/TimeTable.module.css';


const TimeTableColumn = ({ data, verticalCenter }) => {
    const { time, interval } = data;

    return (
        <div className={styles.inline}>
            {   
                data ? time.daytime.map((v, i) => {
                    return <TimeTableCell 
                        key={i}
                        text={v}
                        interval={interval.daytime[i]}
                        verticalCenter={verticalCenter}
                    />
                }) : ''
            }
        </div>
    )
}

export default TimeTableColumn;
