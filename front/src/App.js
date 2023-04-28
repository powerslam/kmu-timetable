import { Route, Routes } from 'react-router-dom';

import { MAIN, LOGIN, SIGNUP } from './lib/variables';

import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';

import { TimeTableProvider } from './lib/TimeTableContext';

import TimeTable from './components/TimeTable/TimeTable';
import SearchMenu from './components/SearchMenu/SearchMenu';

function App() {
  return (
    <Routes>
      <Route exact path={ MAIN } element={<MainPage />}/>
      <Route exact path={ LOGIN } element={<LoginPage/>} />
      <Route exact path={ SIGNUP } element={<SignUpPage />} />
      <Route exact path="/timetable" element={
        <div style={{
          textAlign: "center",
        }}>
          <TimeTableProvider>
            <TimeTable />
            <SearchMenu />
          </TimeTableProvider>
        </div>  
      }/>
    </Routes>
  );
}

export default App;
