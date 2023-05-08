import Card from "../components/common/Card";

import "../styles/Card.css";

const TrafficPage = () => {
    return (
        <div className="Page">
            {Array(4).fill(1).map((v, i) => {
                return (<Card key={i}>
                    <div className="Card-Title Card-Title-Text-Size">교통 수단 이름(ex 1711)</div>
                    <div className="Card-Detail">
                        { /* 슬라이더 같은거 활용해서 몇 정거장 남았는지 특히 지하철 같은 거 실시간 알림 */ }
                        <div className="Card-Detail-Stroke Card-Detail-Margin">
                            남은 시간
                        </div>
                        <span style={{
                            margin: "0.75rem"
                        }}>남았습니다.</span>
                    </div>
                </Card>);
            })}
        </div>
    );
}

export default TrafficPage;
