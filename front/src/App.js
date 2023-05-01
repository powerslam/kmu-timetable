import { Route, Routes } from 'react-router-dom';

import { MAIN, LOGIN, SIGNUP, TRAFFIC, TIMETABLE, EMPTYCLASSROOM } from './lib/variables';

import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TrafficPage from './page/TrafficPage';
import EmptyClassRoomPage from './page/EmptyClassRoomPage';

import TimeTable from './components/TimeTable/TimeTable';

function App() {
  return (
      <div className="w-full h-[92%] fixed top-[8%] overflow-scroll">
        <Routes>
          <Route exact path={ MAIN } element={<MainPage/>} />
          <Route exact path={ LOGIN } element={<LoginPage/>} />
          <Route exact path={ SIGNUP } element={<SignUpPage />} />
          <Route exact path={ TRAFFIC } element={<TrafficPage />} />
          <Route exact path={ TIMETABLE } element={<TimeTable />}/>
          <Route exact path={ EMPTYCLASSROOM } element={<EmptyClassRoomPage />}/>
        </Routes>
      </div>
  );
}

export default App;
