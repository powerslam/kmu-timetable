import { Route, Routes } from 'react-router-dom';

import { MAIN_PATH, LOGIN_PATH, SIGNUP_PATH, TRAFFIC_PATH, TIMETABLE_PATH, EMPTYCLASSROOM_PATH } from './lib/variables';

import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TrafficPage from './page/TrafficPage';
import TimeTablePage from './page/TimeTablePage';
import EmptyClassRoomPage from './page/EmptyClassRoomPage';

import './styles/index.css';

function App() {
  return (
      <div className="main-container">
        <Routes>
          <Route path={ MAIN_PATH } element={<MainPage />} />
          <Route path={ LOGIN_PATH } element={<LoginPage />} />
          <Route path={ SIGNUP_PATH } element={<SignUpPage />} />  
          <Route path={ TRAFFIC_PATH } element={<TrafficPage />} />
          <Route path={ TIMETABLE_PATH } element={<TimeTablePage />}/>
          <Route path={ EMPTYCLASSROOM_PATH } element={<EmptyClassRoomPage />}/>
        </Routes>
      </div>
  );
}

export default App;
