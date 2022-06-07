import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import Grid from "./grid";
import CategoryForm from "./categoryForm";
import {Menu, MenuItem, ProSidebar, SubMenu} from "react-pro-sidebar";
import React, {useState} from "react";
import './App.css';



function App() {


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
    } else if(renderItems=="category"){
           return <div  id="form" style={{marginTop: 50, marginLeft: 360, width: 850 ,height:300}}>
               <CategoryForm    style={{
                   marginLeft: 300, marginTop: 20,
                   marginBottom: 10,
                   marginRight: 50
               }}/>
        </div>;
    }}

    return (
        <div style={{overflow: "hidden"}}>
            <div id="sidebar">
                <ProSidebar style={{height: 900, width: 200, marginLeft: 20, marginTop: 20, fontSize: 5}}>
                    <Menu iconShape="circle" style={{marginLeft: 20, marginTop: 20}}>
                        <MenuItem id={"menuItem"}> <span id="usericon"></span> ShopOnline </MenuItem>
                        <button className="menuItem2" onClick={(e) => setRenderItems("products")}> <span
                            id="prodicon"></span>Ürünler</button>
                        <button className="menuItem2" onClick={(e) => setRenderItems("category")}><span
                            id="categoryicon"></span>Kategoriler</button>

                    </Menu>
                </ProSidebar>
            </div>
            <RederItems/>



        </div>
    );

}

export default App;
