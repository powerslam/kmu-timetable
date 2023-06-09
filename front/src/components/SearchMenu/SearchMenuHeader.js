import '../../styles/SearchMenu.css';

const SearchMenuHeader = () => {
    return <div className="MenuElement MenuHeader bg-white z-30">
        <div className="DeptCD">학부</div>
        <div className="CategoryCD">구분</div>
        <div className="Grade">학년</div>
        <div className="Subject">과목(과목코드)</div>
        <div className="Division">분반</div>
        <div className="Credit">학점</div>
        <div className="Professor">교수님</div>
        <div className="Time">교실/요일/시간</div>
        <div className="Remark">비고</div>
    </div>
};

export default SearchMenuHeader;
