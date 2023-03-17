import styles from '../styles/TimeTable.module.css';

const TimeTableCell = ({text="", isInLine=false}) => {
    return (
        <div className={styles.timetableCell + (isInLine ? ' ' + styles.inline : '')}>
            {text}
        </div>
    );
}

export default TimeTableCell;
