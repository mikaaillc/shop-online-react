import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Grid from "./grid";
import {Menu, MenuItem, ProSidebar, SubMenu} from "react-pro-sidebar";
import React, {useState} from "react";
import Icon from '@mui/material/Icon';



function App() {
    const ChangeItems=(props)=>{

    }

    const [renderItems,setRenderItems] = useState("products");

    const RederItems= () =>{//render olacak itemleri belirlemek için
        if (renderItems=="products") {
           return <div style={{marginTop: 50, marginLeft: 100}}>
            <Grid style={{
                marginLeft: 90, marginTop: 50,
                marginBottom: 5,
                width: 200,
                height: 40,
                marginRight: 50
            }}/>
        </div>;
    } else {
           return <div style={{marginTop: 50, marginLeft: 100}}>
            <h1>asdasdaSAD AS </h1>
        </div>;
    }}

    return (
        <div style={{overflow: "hidden"}}>
            <div id="sidebar">
                <ProSidebar style={{height: 900, width: 200, marginLeft: 20, marginTop: 20, fontSize: 5}}>
                    <Menu iconShape="circle" style={{marginLeft: 20, marginTop: 20}}>
                        <MenuItem  id={"menuItem"}> <span id="usericon"></span> ShopOnline </MenuItem>
                        <MenuItem  className="menuItem2">  <span id="prodicon"></span>Ürünler</MenuItem>
                        <MenuItem   className="menuItem2"><span id="categoryicon"></span>Kategoriler</MenuItem>

                    </Menu>
                </ProSidebar>
            </div>
            <RederItems/>
<span></span>


        </div>
    );

}

export default App;
