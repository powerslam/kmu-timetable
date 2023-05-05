import '../../styles/SearchMenu.css';

const SearchMenuItem = ({ grade, sbjNM, sbjCD, division, credit, professor, time, week, remark}) => {
    return <li className="MenuElement MenuItem">
        <div className="Grade">{ grade }</div>
        <div className="Subject">{`${sbjNM}(${sbjCD})`}</div>
        <div className="Division">{ division }</div>
        <div className="Credit">{ credit }</div>
        <div className="Professor">{ professor }</div>
        <div className="Time">{ time }</div>
        <div className="Week">{ week }</div>
        <div className="Remark">{ remark }</div>
    </li>
};

export default SearchMenuItem;
