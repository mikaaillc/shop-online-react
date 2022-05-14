
import React, { useCallback, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {FormControlLabel,Checkbox} from "@mui/material";



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


export default function Grid () {
    const gridRef = useRef();
    const [checked, setChecked] = useState(false);
    const [rowData] = useState(getresponse);
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
/*        document.querySelector('input[name = "active"]').value =
            selectedRows.length === 1 ? selectedRows[0].active : '';*/

    }, []);
    const handleChange = (event) => {//check box setlemek için
        if (event.data.active== true){
            setChecked((checked) => true);
        }else{
            setChecked((checked) => false);// constların valuları setlenirken arrow func kullnılır
        }
    };

    const [columnDefs] = useState([
        { field: 'productName' },
        { field: 'discount' },
        {field: 'price'},
        { field: 'createDate' },
        { field: 'stock' },
        { field: 'active' },
        { field: 'barcode' },
    ])

    return (


        <div className="ag-theme-alpine-dark" style={{height: 400, width: 1300 , margin:"auto"}}    >
            <FormControlLabel labelPlacement="start"
                              control={<Checkbox  checked={checked}
                                                 onChange={(e) => setChecked(e.target.checked)}
                                                 name="chkAktif"  />} label="Aktif" />
            <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    ref={gridRef}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                    onRowClicked={handleChange}
            >
                </AgGridReact>
        </div>
    );
};
