import Main from './Main'
import {DataProvider} from './Context';
import Auth from './Autenticacion/Autenticacion';
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
