import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


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

    const [rowData] = useState(getresponse);

    const [columnDefs] = useState([
        { field: 'productName' },
        { field: 'discount' },
        { field: 'createDate' },
        { field: 'stock' },
        { field: 'active' },
        { field: 'barcode' },
    ])

    return (
        <div class="ag-theme-balham-dark" style={{height: 400, width: 1200 , margin:"auto"}}  >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

render(<Grid />, document.getElementById('root'));