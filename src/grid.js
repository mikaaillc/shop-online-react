
import React, { useCallback, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {FormControlLabel,Checkbox} from "@mui/material";
import CategoryCombo from "./categoryCombo";


var axios = require('axios');
var getresponse;
var config = {
    method: 'get',
    url: 'http://localhost:8080/Product/getAllProduct'
};


axios(config)
    .then(function (response) {
        getresponse= response.data;
    })
    .catch(function (error) {
        console.log(error);
    });


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
    }, []);
    const handleChange = (event) => {//check box setlemek için
        if (event.data.active== true){
            setChecked((checked) => true);
        }else{
            setChecked((checked) => false);// constların valuları setlenirken arrow func kullnılır
        }

        setPlaceholder(event.data.category.categoryName)

    };
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


    return (


        <div className="ag-theme-alpine-dark" style={{height: 400, width: 1300 , margin:"auto"}}    >

            <FormControlLabel labelPlacement="start"
                              style={{alignSelf: 'flex-end'}}
                              control={<Checkbox  checked={checked}
                                                 onChange={(e) => setChecked(e.target.checked)}
                                                 name="chkAktif"  />} label="Aktif" />


        <FormControlLabel
                label="Kategori:"
                control={<CategoryCombo    placeholder={placehoder} style={{float: "right", marginRight: 50}}/>}//props kullanımı için
                labelPlacement="start"

            />


            <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    ref={gridRef}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                    onRowClicked={handleChange}
            >
                </AgGridReact>
        </div>
    );
};
