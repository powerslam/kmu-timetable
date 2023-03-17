import TimeTableCell from "./TimeTableCell";
import styles from '../styles/TimeTable.module.css';


const TimeTableColumn = () => {
    return (
        <div className={styles.inline}>
            {
                ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((i, v) => {
                    return <TimeTableCell 
                        key={v} 
                        text={`${i} 교시`} 
                    />
                })
            }
        </div>
    )
}

export default TimeTableColumn;
