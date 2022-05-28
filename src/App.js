
import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Grid from "./grid";
import Sidebar from "./sidebar";



function App() {
  return (
    <div style={{overflow: "hidden"}}>

        <div >
            <Sidebar/>
        </div>

          <div style={{marginLeft:300,marginTop:40}}>

            <Grid style={{marginLeft:50,marginTop:40,
                marginBottom: 5,
                width: 200,
                height: 40,
                marginRight: 50
            }} />
        </div>
      </div>
  );

}

export default App;
