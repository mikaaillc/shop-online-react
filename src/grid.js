
import React, { useCallback, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {Checkbox} from "@mui/material";



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


export const Grid = () => {
    const gridRef = useRef();
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
        //todo chech auto set eklenecek
        var checked=selectedRows[0].active;
        if(selectedRows[0].active===true){
        document.querySelector('input[name="chkAktif"]').value = checked;
        }
        else{document.querySelector('input[name="chkAktif"]').value = false;}

    }, []);

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


        <div class="ag-theme-balham-dark" style={{height: 400, width: 1300 , margin:"auto"}}   >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    ref={gridRef}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}>
                </AgGridReact>
        </div>
    );
};

render(<Grid />, document.getElementById('root'));