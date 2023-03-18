import styles from '../styles/TimeTable.module.css';

import { common_height } from '../lib/variables';

const TimeTableCell = ({text, interval=1, isInLine=false}) => {
    console.log(interval, text);

    return (
        <div 
            style={{ 
                height: common_height * interval,
            }}
            className={styles.timetableCell + (isInLine ? ' ' + styles.inline : '')}>
            {text}
        </div>
    );
}

export default TimeTableCell;
