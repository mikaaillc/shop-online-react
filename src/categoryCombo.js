import * as React from 'react';
import { render } from 'react-dom';
import axios from "axios";
import {Component, useEffect, useState} from "react";
import './App.css';
import {InputLabel, MenuItem, Select} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
// const url ='http://localhost:8080/Category/getAllCategory'
//
// export default class  CategoryCombo extends Component{
//     state = { data: [] }
//
//     componentWillMount() {
//         axios(url).then(resp => {
//             this.setState({data: resp.data})
//         })
//     }
//
//
//     option(){
//         return this.state.data.map(category => {
//             return <option value={category.id}  value={category.id}>
//                 {category.categoryName}</option>
//         })
//     }
//
// render (){
//         return(
//            <div >
//                <label htmlFor="">Kategori : </label>
//             <select className="combo"  >
//                 {this.option()}
//             </select>
//             </div>
//
//         )
//     }
// }

export default function CategoryCombo(props) {

    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [reloadGrid, setReloadGrid] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8080/Category/getAllCategory")
            .then((response) => {
                setList(response.data);
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);

    const handleChange = (event) => {
        setCategoryName(event.target.value);
        debugger;
        var value = list.filter(function(item) {
            if(item.categoryName == event.target.value)
                return item.id
        })
        debugger;
        axios
            .get("http://localhost:8080/Product/getProductsByCategoryId", { params: { categoryId: value[0].id
                } })
            .then((response) => {
                setReloadGrid(response.data)
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    };

    return (
        <div >
                <Select
                    value={categoryName}
                    onChange={handleChange}
                    reloadGrid={reloadGrid}
                    style={{marginLeft:5,marginBottom:5,marginTop:5,width:200 ,height:40,backgroundColor:"whitesmoke"}}
                    renderValue={
                        () => <MenuItem > {props.placeholder}</MenuItem>
                    }
                >
                    {list.map((item) => (
                        <MenuItem key={item.id} value={item.categoryName}>
                            {item.categoryName}
                        </MenuItem>
                    ))}
                </Select>

        </div>
    );

}





// const url ='http://localhost:8080/Category/getAllCategory'
//
// var getresponse;
// export default class  CategoryCombo extends Component {
//     constructor() {
//         super();
//         axios(url).then(resp => {
//             debugger;
//             getresponse=resp.data
//         })
//     }
//
//     render() {
//         const data = getresponse
//         debugger;
//         return (
//             <Autocomplete
//                 disablePortal
//                 id="categoryName"
//                 options={data}
//                 sx={{width: 300}}
//                 renderInput={(params) => <TextField {...params} label="Kategori"/>}
//             />)
//
//     }
//
//
// }