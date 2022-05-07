import logo from './logo.svg';
import './App.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Grid} from "./grid";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App" style={{margin:"left"}}>
      <ProSidebar  style={{height: 800, width: 200}}>

        <Menu iconShape="square">
          <MenuItem >Dashboard</MenuItem>
          <SubMenu title="Components" >
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>


            <SubMenu title="Components" >
              <MenuItem>Component 1</MenuItem>
              <SubMenu title="Sub Component 1" >

              </SubMenu>
            </SubMenu>

        </Menu>
      </ProSidebar>
        <div >
            <Grid/>
        </div>


    </div>
  );
}

export default App;
