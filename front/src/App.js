import { TimeTableProvider } from './lib/TimeTableContext';

import TimeTable from './components/TimeTable';
import AddButton from './components/AddButton';

function App() {
  return (
    <div>
      <TimeTableProvider>
        <TimeTable />
        <AddButton />
      </TimeTableProvider>
    </div>  
  );
}

export default App;
