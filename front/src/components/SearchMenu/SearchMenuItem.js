import '../../styles/SearchMenu.css';

const SearchMenuItem = ({ onClick, deptCD, categoryCD, grade, sbjNM, sbjCD, division, credit, professor, time, remark}) => {
    return <li className="MenuElement MenuItem" onClick={onClick}>
        <div className="DeptCD">{ deptCD }</div>
        <div className="CategoryCD">{ categoryCD }</div>
        <div className="Grade">{ grade }</div>
        <div className="Subject">{`${sbjNM}\n(${sbjCD})`}</div>
        <div className="Division">{ division }</div>
        <div className="Credit">{ credit }</div>
        <div className="Professor">{ professor }</div>
        <div className="Time">{ time }</div>
        <div className="Remark">{ remark }</div>
    </li>
};

export default SearchMenuItem;
