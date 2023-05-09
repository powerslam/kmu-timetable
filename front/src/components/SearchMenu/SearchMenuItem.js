import '../../styles/SearchMenu.css';

const SearchMenuItem = ({ onClick, deptCD, categoryCD, grade, sbjNM, sbjCD, division, credit, professor, classRoomInfo, time, remark}) => {
    const windowSize = window.innerWidth;

    return <li className="MenuElement MenuItem" onClick={onClick}>
        {windowSize > 768 ? <>
            <div className="DeptCD">{ deptCD }</div>
            <div className="CategoryCD">{ categoryCD }</div>
            <div className="Grade">{ grade }</div>
            <div className="Subject Small-Title">{`${sbjNM}\n(${sbjCD})`}</div>
            <div className="Division">{ division }</div>
            <div className="Credit">{ credit }</div>
            <div className="Professor">{ professor }</div>
            <div className="Time">{ time }</div>
            <div className="Remark">{ remark }</div>
        </>:<>
            <div className="Small-Title Item-Content">{`${sbjNM}\n(${sbjCD})`}</div>
            <div className="Item-Content">{ professor }</div>
            <div className="Item-Content">{ classRoomInfo }</div>
            <div className="Item-Content">{ time }</div>
            <div className="Item-Content">{ grade }학년/{ categoryCD }/{ credit }학점</div>
        </>}
    </li>
};

export default SearchMenuItem;
