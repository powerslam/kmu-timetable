import { NavLink } from "react-router-dom";
import { MAIN, LOGIN, TIMETABLE } from "../lib/variables";

const NavBar = () => {
    return (
        <nav className="flex flex-row items-center justify-between bg-teal-500 w-full h-[8%] ">
            <div className="flex flex-shrink-0 text-white mx-6 max-md:mx-4">
                <NavLink to={ MAIN }>
                    <span className="font-semibold tracking-tight text-5xl max-md:text-3xl max-[380px]:text-2xl">K-Time</span>
                </NavLink>
            </div>

            <div className="flex flex-row items-center max-md:hidden">
                <NavLink to={ LOGIN }>
                    <span className="text-teal-200 hover:text-white text-2xl mr-6">로그인</span>
                </NavLink>
                
                <NavLink to={ TIMETABLE }>
                    <span className="text-teal-200 hover:text-white text-2xl mr-6">시간표</span>
                </NavLink>
            </div>

            <div className="md:hidden mr-6">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
        </nav>
    )
}

export default NavBar;
