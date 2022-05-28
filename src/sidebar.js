import React, { Component } from "react";
import './App.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

class Sidebar extends Component{
    render() {
        return (
<div id="sidebar" >
            <ProSidebar style={{height: 900, width: 200, marginLeft: 20, marginTop: 20 ,fontSize: 5}}>
                <Menu iconShape="square" style={{marginLeft: 20, marginTop: 20 ,fontSize: 50}}>
                    <MenuItem id={"menuItem"}  >Dashboard</MenuItem>
                    <SubMenu title="Components">
                        <MenuItem >Component 1</MenuItem>
                    </SubMenu>
                    <SubMenu title="Components">
                        <MenuItem >Component 1</MenuItem>
                        <SubMenu title="Sub Component 1">
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </ProSidebar>
</div>
        )
    }
}
export default Sidebar