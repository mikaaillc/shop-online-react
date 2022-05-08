import React, { Component } from "react";
import {Grid} from "./grid";
import {Form, Label} from "reactstrap";
import './App.css';

import {Box, FormControlLabel, Button, TextField,Checkbox} from "@mui/material";





class FormUI extends Component{
    state = {
        name: "",
        email: ""
    };

    render(){
        const { name, email } = this.state;
        return(
            <div className="card">
                <br/>
                <h4 style={{marginLeft:20 ,marginBottom:50}}>ÜRÜN BİLGİLERİ</h4>
                <div className="card-body">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                    <Form>

                        <div> <FormControlLabel
                            label="Ürün Adı:"
                            control={<TextField  id ="textfield" name="productName" variant="outlined" style={{width:500}} />}
                            labelPlacement="start"

                        />
                            <FormControlLabel
                                label="Ürün Fiyatı:"
                                control={<TextField  id ="textfield" name="price" variant="outlined" />}
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                label="İndirim:"
                                control={<TextField  id ="textfield" name="discount" variant="outlined"/>}
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                label="Stok Miktarı:"
                                control={<TextField  id ="textfield" name="stock" variant="outlined" />}
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                label="Barkod:"
                                control={<TextField  id ="textfield" name="barcode" variant="outlined" />}
                                labelPlacement="start"
                            />
                            <FormControlLabel labelPlacement="start" control={<Checkbox defaultChecked name="chkAktif"  />} label="Aktif" />

                        </div>
                    </Form>
                        <Button variant="contained" className="btn btn-danger btn-block" style={{float:"right",marginRight:50}}>Güncelle</Button>
                        </Box>

                </div>

            </div>
    )
    }
}
export default FormUI