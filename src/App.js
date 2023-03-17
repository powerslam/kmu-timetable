import { TimeTableProvider } from './lib/TimeTableContext';
import TimeTable from './components/TimeTable';

function App() {
  return (
    <div>
      <TimeTableProvider>
        <TimeTable />
      </TimeTableProvider>
    </div>  
  );
}

export default App;
