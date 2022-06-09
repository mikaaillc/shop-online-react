import React, {useState,useEffect} from "react";
import axios from "axios";
import {Box, FormControlLabel, MenuItem, TextField, Menu, TablePagination} from "@mui/material";

import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CategoryForm(props) {
    //Kategori get
    const [list, setCategory] = useState([]);
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    return (

        <div className="card">

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
                <TableContainer id="TableCategory" style={{marginTop:180 ,borderRadius:10}} component={Paper} >
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

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination  id="label" bgcolor={"#2f323b"}
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={list.length}
                    />
                </TableContainer>


            </div>

        </div>
    )

}