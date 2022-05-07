
import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import {Grid} from "./grid";
import Sidebar from "./sidebar";


function App() {
  return (
      <div style={{overflow: "hidden"}}>
        <div  id="sidebar">
            <Sidebar/>
        </div>
        <div style={{marginLeft:40,marginTop:350}}>
            <Grid/>
        </div>
      </div>
  );
}

export default App;
