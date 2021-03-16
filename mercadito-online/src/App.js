import Main from './Main'
import {DataProvider} from './Context';
function App() {
  return (
    <DataProvider>
       <div>
      <Main/>
    </div>
    </DataProvider>
   
  );
}

export default App;
