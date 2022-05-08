
import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import {Grid} from "./grid";
import Sidebar from "./sidebar";
import FormUI from "./form";


function App() {
  return (
    <div style={{overflow: "hidden"}}>

        <div  id="sidebar">
            <Sidebar/>
        </div>

          <div style={{marginLeft:50,marginTop:40}}>
            <div  id="form"  >
                <FormUI/>
            </div>
            <Grid/>
        </div>
      </div>
  );
}

export default App;
