import * as React from 'react';
import { render } from 'react-dom';
import axios from "axios";
import {Component, useEffect, useState} from "react";
import './App.css';
import {InputLabel, MenuItem, Select} from "@mui/material";


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

export default function CategoryCombo() {
    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);

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
    };

    return (
        <div>
                <Select
                    labelId="category-label"
                    name="category"
                    value={categoryName}
                    onChange={handleChange}
                    style={{width:200}}

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

render(<CategoryCombo />, document.getElementById('root'));