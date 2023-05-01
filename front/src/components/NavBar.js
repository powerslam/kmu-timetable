import { NavLink } from "react-router-dom";
import { MAIN, LOGIN, TRAFFIC, TIMETABLE, EMPTYCLASSROOM } from "../lib/variables";

import { ReactComponent as BusIcon } from "../resources/bus.svg";
import { ReactComponent as EmptyRoomIcon } from "../resources/emptyroom.svg";
import { ReactComponent as ScheduleIcon } from "../resources/schedule.svg";

import "../styles/NavBar.css";

const NavBar = () => {
    return (
        <nav className="menu-body">
            <div className="flex flex-shrink-0 text-white mx-6 max-md:mx-4">
                <NavLink to={ MAIN }>
                    <span className="font-semibold tracking-tight text-5xl max-md:text-3xl max-[380px]:text-2xl">K-Time</span>
                </NavLink>
            </div>

            <div className="flex flex-row items-center">
                <NavLink to={ TIMETABLE }>
                    <span className="menu-text">시간표</span>
                    <ScheduleIcon className="menu-icon"/>
                </NavLink>

                <NavLink to={ EMPTYCLASSROOM }>
                    <span className="menu-text">빈 강의실</span>
                    <EmptyRoomIcon className="menu-icon"/>
                </NavLink>

                <NavLink to={ TRAFFIC }>
                    <span className="menu-text">교통정보</span>
                    <BusIcon className="menu-icon"/>
                </NavLink>

                <NavLink to={ LOGIN }>
                    <span className="menu-text">로그인</span>
                    <BusIcon className="menu-icon"/>
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;
