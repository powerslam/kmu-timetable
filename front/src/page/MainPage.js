import { useNavigate } from "react-router-dom";

import { LOGIN } from "../lib/variables";

const MainPage = () => {
    const navigate = useNavigate();

    return <div className="w-full h-full">
        <button onClick={() => navigate(LOGIN)}>로그인하러 가기</button>
    </div>
}

export default MainPage;