import { TimeTableProvider } from './lib/TimeTableContext';
import TimeTable from './components/TimeTable';

function App() {
  return (
    <div>
      <TimeTableProvider>
        <TimeTable />
        <>{
          "수강과목 추가하기 만들기"
        }</>
      </TimeTableProvider>
    </div>  
  );
}

export default App;
