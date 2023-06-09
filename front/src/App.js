import { Route, Routes } from 'react-router-dom';

import { MAIN_PATH, LOGIN_PATH, SIGNUP_PATH, TIMETABLE_PATH, EMPTYCLASSROOM_PATH } from './lib/variables';

import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TimeTablePage from './page/TimeTablePage';
import EmptyClassRoomPage from './page/EmptyClassRoomPage';

import './styles/index.css';

function App() {
  return (
      <div className="main-container main-container-height">
        <Routes>
          <Route path={ MAIN_PATH } element={<MainPage />} />
          <Route path={ LOGIN_PATH } element={<LoginPage />} />
          <Route path={ SIGNUP_PATH } element={<SignUpPage />} />  
          <Route path={ TIMETABLE_PATH } element={<TimeTablePage />}/>
          <Route path={ EMPTYCLASSROOM_PATH } element={<EmptyClassRoomPage />}/>
        </Routes>
      </div>
  );
}

export default App;
