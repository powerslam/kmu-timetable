import { TimeTableProvider } from './lib/TimeTableContext';

import TimeTable from './components/TimeTable/TimeTable';
import AddButton from './components/SearchMenu/AddButton';
import SearchMenu from './components/SearchMenu/SearchMenu';

function App() {
  return (
    <div style={{
      textAlign: "center",
    }}>
      <TimeTableProvider>
        <TimeTable />
        <AddButton />
        <SearchMenu />
      </TimeTableProvider>
    </div>  
  );
}

export default App;
