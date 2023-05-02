import { useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../lib/variables";

const NeedLoginPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <span>로그인이 필요한 서비스 입니다.</span>
            <button onClick={() => navigate(LOGIN_PATH)}>로그인하러가기</button>
        </div>
    )
};

export default NeedLoginPage;
