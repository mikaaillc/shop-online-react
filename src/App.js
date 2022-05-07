
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
        <div style={{marginLeft:40,marginTop:40}}>
            <div  style={{height: 400, width: 1200 , margin:"auto",marginBottom:20,backgroundColor:"darkblue"}} >
            </div>
            <Grid/>
        </div>
      </div>
  );
}

export default App;
