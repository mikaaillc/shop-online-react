import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

class Sidebar extends Component{
    render() {
        return (

            <ProSidebar id="sidebar" style={{height: 900, width: 200, marginLeft: 20, marginTop: 20}}>
                <Menu iconShape="square">
                    <MenuItem>Dashboard</MenuItem>
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
        )
    }
}
export default Sidebar