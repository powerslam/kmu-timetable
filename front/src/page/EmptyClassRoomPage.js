import AuthPage from "../components/common/AuthPage";
import Card from "../components/common/Card";

import { NULL_STR } from "../lib/variables";

const EmptyClassRoomPage = () => {
    return (
        <AuthPage>
            {Array(4).fill(1).map((v, i) => {
                if(v === NULL_STR) return null;
                return (
                    <Card key={i}>
                        <div className="Card-Title">교실이름</div>
                        <div className="Card-Detail">
                            <div className="Card-Detail-Stroke">
                                남은 시간
                            </div>
                            <span className="mx-2">남았습니다.</span>
                        </div>
                    </Card>
                );
            })}
        </AuthPage>
    );
}

export default EmptyClassRoomPage;
