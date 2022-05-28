
import React, { useCallback, useRef, useState,useEffect } from 'react';
import FormUI from "./form";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {FormControlLabel,Checkbox} from "@mui/material";

import { MenuItem, Select} from "@mui/material";


var axios = require('axios');
var getresponse;
var config = {
    method: 'get',
    url: 'http://localhost:8082/Product/getAllProduct'
};


axios(config)
    .then(function (response) {
        getresponse= response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

var prodID=null;
var activeCheck={value:null};
var category={value:null};
export default function Grid (props) {
    const gridRef = useRef();
    const [checked, setChecked] = useState(false);
    const [placehoder,setPlaceholder]=useState("");
    const rowData = getresponse;
    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        document.querySelector('Input[name = "productName"]').value =
            selectedRows.length === 1 ? selectedRows[0].productName : '';
        document.querySelector('input[name = "discount"]').value =
            selectedRows.length === 1 ? selectedRows[0].discount : '';
        document.querySelector('input[name = "price"]').value =
            selectedRows.length === 1 ? selectedRows[0].price : '';
        document.querySelector('input[name = "stock"]').value =
            selectedRows.length === 1 ? selectedRows[0].stock : '';
        document.querySelector('input[name = "barcode"]').value =
            selectedRows.length === 1 ? selectedRows[0].barcode : '';
         prodID=selectedRows[0].id;
         activeCheck.value=selectedRows[0].active
         category.value=selectedRows[0].category

    }, []);
    /* const handleChange = (event) => {//check box setlemek için
        if (event.data.active== true){
            setChecked((checked) => true);
        }else{
            setChecked((checked) => false);// constların valuları setlenirken arrow func kullnılır
        }

        setPlaceholder(event.data.category.categoryName)

    }; */

    function AgGridCheckbox (props) {
        const boolValue = props.value && props.value.toString() === 'true';
        const [isChecked, setIsChecked] = useState(boolValue);
        const onChanged = () => {
            props.setValue(!isChecked);
            setIsChecked(!isChecked);
        };
        return (
            <div>
                <input type="checkbox" checked={isChecked} onChange={onChanged} />
            </div>
        );
    }
    const columns = [
        { field: 'productName' , width: 150,},
        { field: 'discount' , width: 150, },
        {field: 'price'},
        { field: 'createDate' },
        { field: 'stock' ,width: 150,},
        { field: 'barcode' },
        {
            headerName: 'Active',
            field: 'active',
            width: 150,
            cellRendererFramework: AgGridCheckbox,
            editable: false
        }];

        const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8082/Category/getAllCategory")
            .then((response) => {
                setList(response.data);
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);

    const handleChangeActive = (event) => {
        setChecked(event.target.checked)
    axios
        .get("http://localhost:8082/Product/getProductsByActive/", {
            params: {
                active: event.target.checked
            }
        } )
        .then((response) => {
            gridRef.current.api.setRowData(response.data)
        })
        .catch((e) => {
            console.log(e.response.data);
        });
    }
    const handleChangeCombo = (event) => {
        setCategoryName(event.target.value);//comboya görünecek kategoriyi setlemek için
        if(event.target.value=='Tumu'){
            axios
                .get(config.url,
                )
                .then((response) => {
                    gridRef.current.api.setRowData(response.data)
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        }else {
            var value = list.filter(function (item) {
                if (item.categoryName == event.target.value)
                    return item.id
            })
            axios
                .get("http://localhost:8082/Product/getProductsByCategoryId", {
                    params: {
                        categoryId: value[0].id
                    }
                })
                .then((response) => {
                    gridRef.current.api.setRowData(response.data)
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        }


    };


    return (


        <div className="ag-theme-alpine-dark" style={{height: 400, width: 1300 , margin:"auto"}}    >
            <div  id="form"  style={{marginBottom:10,marginTop:40}} >
                <FormUI prodID={prodID} activeCheck={activeCheck} category={category}/>{/*seçilen productid forma gönderildi*/}
            </div>
            <AgGridReact
                    className="grid"
                    rowData={rowData}
                    columnDefs={columns}
                    ref={gridRef}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                    /* onRowClicked={handleChange} */
                
            >
                </AgGridReact>

            <FormControlLabel labelPlacement="start"
                              style={{alignSelf: 'flex-end'}}
                              control={<Checkbox  checked={checked}
                                                  onChange={handleChangeActive}
                                                  name="chkAktif"  />} label="Aktif" />


            <FormControlLabel
                label="Kategori:"
                control={
                    <Select
                        value={categoryName}
                        onChange={handleChangeCombo}
                        placeholder={placehoder}

                        style={{
                            marginLeft: 5,
                            marginBottom: 5,
                            marginTop: 5,
                            width: 200,
                            height: 40,
                            backgroundColor: "whitesmoke",
                            float: "right",
                            marginRight: 50
                        }}
                        // renderValue={
                        //     () => <MenuItem> {props.placeholder}</MenuItem>
                        // }
                    >
                        <MenuItem value='Tumu'>
                            Tümü
                        </MenuItem>
                        {list.map((item) => (
                            <MenuItem key={item.id} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>

                }//props kullanımı için
                labelPlacement="start"

            />



        </div>
    );
};
