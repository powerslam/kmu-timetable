import { NavLink, useNavigate } from "react-router-dom";

import "../styles/NavBar.css";
import { ReactComponent as BusIcon } from "../resources/bus.svg";
import { ReactComponent as LoginIcon } from "../resources/login.svg";
import { ReactComponent as LogoutIcon } from "../resources/logout.svg";
import { ReactComponent as ScheduleIcon } from "../resources/schedule.svg";
import { ReactComponent as EmptyRoomIcon } from "../resources/emptyroom.svg";

import { MAIN_PATH, LOGIN_PATH, TRAFFIC_PATH, TIMETABLE_PATH, EMPTYCLASSROOM_PATH } from "../lib/variables";
import { LOGOUT, useServiceDispatch } from "../lib/ServiceContext";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useServiceDispatch();

    return (
        <nav className="menu-body">
            <div className="flex flex-shrink-0 text-white mx-6 max-md:mx-4">
                <NavLink to={ MAIN_PATH }>
                    <span className="font-semibold tracking-tight text-5xl max-md:text-3xl max-[380px]:text-2xl">K-Time</span>
                </NavLink>
            </div>

            <div className="flex flex-row items-center">
                <NavLink to={ TIMETABLE_PATH }>
                    <span className="menu-text">시간표</span>
                    <ScheduleIcon className="menu-icon"/>
                </NavLink>

                <NavLink to={ EMPTYCLASSROOM_PATH }>
                    <span className="menu-text">빈 강의실</span>
                    <EmptyRoomIcon className="menu-icon"/>
                </NavLink>

                <NavLink to={ TRAFFIC_PATH }>
                    <span className="menu-text">교통정보</span>
                    <BusIcon className="menu-icon"/>
                </NavLink>

                <div onClick={() => {
                    dispatch({ type: LOGOUT });
                    navigate(LOGIN_PATH);
                }}>
                    <span className="menu-text">{!localStorage.getItem("pwd") ? "로그인" : "로그아웃"}</span>
                    {!localStorage.getItem("pwd") ? <LoginIcon className="menu-icon"/> : <LogoutIcon className="menu-icon" /> }
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
