import Card from "../components/common/Card";

import { weekly, NULL_STR } from "../lib/variables";

const TrafficPage = () => {
    return (
        <div className="w-full h-fit flex flex-col items-center justify-center mt-4">
            {Array(4).fill(1).map((v, i) => {
                if(v === NULL_STR) return null;
                return (
                    <Card key={i}>
                        { /* 버스 이미지 / 지하철 이미지 넣기 */ }
                        <div className="Card-Title">교통 수단 이름(ex 1711)</div>
                        <div className="Card-Detail">
                            { /* 슬라이더 같은거 활용해서 몇 정거장 남았는지 특히 지하철 같은 거 실시간 알림 */ }
                            <div className="Card-Detail-Stroke">
                                남은 시간
                            </div>
                            <span className="mx-2">남았습니다.</span>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}

export default TrafficPage;
