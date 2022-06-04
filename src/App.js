import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Grid from "./grid";
import {Menu, MenuItem, ProSidebar, SubMenu} from "react-pro-sidebar";
import React from "react";


function App() {
    return (
        <div style={{overflow: "hidden"}}>

            <div id="sidebar">
                <ProSidebar style={{height: 900, width: 200, marginLeft: 20, marginTop: 20, fontSize: 5}}>
                    <Menu iconShape="square" style={{marginLeft: 20, marginTop: 20, fontSize: 50}}>
                        <MenuItem id={"menuItem"}>Dashboard</MenuItem>
                        <SubMenu title="Components">
                            <MenuItem>Component 1</MenuItem>
                        </SubMenu>
                        <SubMenu title="Components">
                            <MenuItem>Component 1</MenuItem>
                            <SubMenu title="Sub Component 1">
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </ProSidebar>
            </div>

            <div style={{marginTop: 50, marginLeft: 100}}>
                <Grid style={{
                    marginLeft: 90, marginTop: 50,
                    marginBottom: 5,
                    width: 200,
                    height: 40,
                    marginRight: 50
                }}/>
            </div>


        </div>
    );

}

export default App;
