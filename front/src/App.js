import { Route, Routes } from 'react-router-dom';

import { MAIN, LOGIN, SIGNUP, TIMETABLE } from './lib/variables';

import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';

import TimeTable from './components/TimeTable/TimeTable';

function App() {
  return (
      <div className="w-full h-[92%] flex items-center">
        <Routes>
          <Route exact path={ MAIN } element={<MainPage/>} />
          <Route exact path={ LOGIN } element={<LoginPage/>} />
          <Route exact path={ SIGNUP } element={<SignUpPage />} />
          <Route exact path={ TIMETABLE } element={<TimeTable />}/>
        </Routes>
      </div>
  );
}

export default App;
