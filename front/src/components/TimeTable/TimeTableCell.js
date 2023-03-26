import styles from '../../styles/TimeTable.module.css';

import { common_height } from '../../lib/variables';

const TimeTableCell = ({text, interval=1, isInLine=false, verticalCenter=false}) => {
    //console.log(interval, text);

    return (
        <div 
            style={{ 
                height: `${(common_height) * interval + 2 * (interval - 1)}px`,
                lineHeight: verticalCenter ? `${(common_height) * interval + 2 * (interval - 1)}px` : ``,
            }}
            className={styles.timetableCell + (isInLine ? ' ' + styles.inline : '')}>
            {text}
        </div>
    );
}

export default TimeTableCell;
