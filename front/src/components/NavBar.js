import { NavLink, useNavigate } from "react-router-dom";

import "../styles/NavBar.css";

import { ReactComponent as LoginIcon } from "../resources/login.svg";
import { ReactComponent as LogoutIcon } from "../resources/logout.svg";
import { ReactComponent as ScheduleIcon } from "../resources/schedule.svg";
import { ReactComponent as EmptyRoomIcon } from "../resources/emptyroom.svg";

import { MAIN_PATH, LOGIN_PATH, TIMETABLE_PATH, EMPTYCLASSROOM_PATH } from "../lib/variables";
import { LOGOUT, useServiceDispatch } from "../lib/ServiceContext";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useServiceDispatch();

    return (
        <nav className="menu-body menu-body-height">
            <div className="menu-title-container">
                <NavLink className="menu-title link" to={ MAIN_PATH }>
                    <span>K-Time</span>
                </NavLink>
            </div>

            <div className="menu-text-container">
                <NavLink className="link" to={ TIMETABLE_PATH }>
                    <span className="menu-text">시간표</span>
                    <div className="icon-container">
                        <ScheduleIcon className="icon"/>
                    </div>
                </NavLink>

                <NavLink className="link" to={ EMPTYCLASSROOM_PATH }>
                    <span className="menu-text">빈 강의실</span>
                    <div className="icon-container">
                        <EmptyRoomIcon className="icon"/>
                    </div>
                </NavLink>

                <div onClick={() => {
                    dispatch({ type: LOGOUT });
                    navigate(LOGIN_PATH);
                }}>
                    <span className="menu-text">{!localStorage.getItem("pwd") ? "로그인" : "로그아웃"}</span>
                    <div className="icon-container">
                        {!localStorage.getItem("pwd") 
                          ? <LoginIcon className="icon"/> 
                          : <LogoutIcon className="icon"/>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
