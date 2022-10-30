import React, {useState,useEffect,useRef} from "react";
import axios from "axios";
import {Box, FormControlLabel, TextField} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-theme-dark.css';


export default function CategoryForm(props) {
    //Kategori get
    const [categoryList, setCategory] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8082/Category/getAllCategory")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);

    //region Kategori ekleme
    const handleSubmitSave = () => {
        var categoryName = document.querySelector('Input[name = "categoryName"]').value

        var data = JSON.stringify({
            "categoryName": categoryName,
            "active" : true
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8082/Category/addCategory',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("İşlem Başarılı");
                axios
                    .get("http://localhost:8082/Category/getAllCategory")
                    .then((response) => {
                        setCategory(response.data);
                    })
                    .catch((e) => {
                        console.log(e.response.data);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // endregion

    const saveActive = (event) => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        var data = JSON.stringify({
            "categoryName": selectedRows[0].categoryName,
            "active" : !event
        });

        var config = {
            method: 'put',
            url: 'http://localhost:8082/Category/updateCategory/' +selectedRows[0].id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("İşlem Başarılı");
                axios
                    .get("http://localhost:8082/Category/getAllCategory")
                    .then((response) => {
                        setCategory(response.data);
                    })
                    .catch((e) => {
                        console.log(e.response.data);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // endregion
    function AgGridCheckbox(props) {
        const boolValue = props.value && props.value.toString() === 'true';
        const [isChecked, setIsChecked] = useState(boolValue);
        const onChanged = () => {
            props.setValue(!isChecked);
            setIsChecked(!isChecked);
        };
        return (
            <div>
                <input type="checkbox" checked={isChecked} onChange={onChanged}
                       onClick={(e)=>saveActive(isChecked)}/>
            </div>
        );
    }
    const gridRef = useRef();
    const columns = [
        {field: 'id', width: 160, headerName: "Kategori Id",sortable: true},
        {field: 'categoryName', width: 300  , headerName: "Kategori",sortable: true},
        {
            field: 'active',
            headerName: "Aktif",
            width: 110,
            cellRendererFramework: AgGridCheckbox,
            editable: false
        },
        ];
    return (

        <div className="card">

            <ToastContainer
                theme="colored"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
            <br/>
            <h3 id="label" style={{marginLeft: 20, marginBottom: 30}}>Kategori</h3>
            <div className="card-body">

                <Box
                    className="box"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                        <div><FormControlLabel
                            label="Kategori Adı:"
                            id="label"
                            control={<div><TextField id="textfield" name="categoryName" variant="outlined"
                                                style={{marginLeft:5,width: 500}}
                            />  <button className="glow-on-hover"
                                        onClick={handleSubmitSave}
                                        style={{float: "right", marginRight: 50}}>Kaydet
                            </button> </div>}
                            labelPlacement="start"

                        />
                        </div>

                </Box>
                <div  className="ag-theme-dark"  id="form2" style={{ marginTop:180,height: 400, width: 575}}>
                    <AgGridReact
                        className="grid"
                        rowData={categoryList}
                        columnDefs={columns}
                        ref={gridRef}

                        rowHeight={50}
                        rowSelection={'single'}
                        //onRowClicked={handleChange}

                    >
                    </AgGridReact>
                </div>

                {/*<TableContainer id="TableCategory" style={{marginTop:180 ,borderRadius:10}} component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="sticky table" bgcolor={"#2f323b"} style={{borderRadius:5}}  >
                        <TableHead>
                            <TableRow>
                                <TableCell  id="label">Kategoriler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((row) => (

                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row" id="label" >
                                        {row.id}
                                    </TableCell>
                                    <TableCell  id="label" align="left">{row.categoryName}</TableCell>
                                    <TableCell  id="label" align="left">
                                        <Checkbox checked={row.active}
                                                  onClick={(e) => setChecked(!checked)}/>
                                           </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination  id="label" bgcolor={"#2f323b"}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={list.length}
                    />
                </TableContainer>*/}


            </div>

        </div>
    )

}