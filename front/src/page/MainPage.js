import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_PATH } from "../lib/variables";
import { useServiceState, useServiceDispatch, LOGOUT } from "../lib/ServiceContext";

const MainPage = () => {
    const navigate = useNavigate();
    const { isLogin } = useServiceState();
    const dispatch = useServiceDispatch();

    useEffect(() => {
        if(!isLogin) navigate(LOGIN_PATH);
    });

    const onLogout = () => {
        dispatch({ type: LOGOUT });
        navigate(LOGIN_PATH);
    }

    return isLogin ? (
        <button className="btn btn-green" onClick={onLogout}>로그아웃</button>
    ) : null;
}

export default MainPage;