import React, {useState} from "react";
import axios from "axios";
import {Box, FormControlLabel, TextField} from "@mui/material";
import {Form} from "reactstrap";
import './App.css';

export default function CategoryForm(props) {
    const handleSubmitSave = () => {

    }
    const handleSubmitUpdate = () => {

    }
    // endregion

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
                    <Form>
                        <div><FormControlLabel
                            label="Kategori Adı:"
                            id="label"
                            control={<div><TextField id="textfield" name="productName" variant="outlined"
                                                style={{marginLeft:5,width: 500}}
                            />  <button className="glow-on-hover"
                                        onClick={handleSubmitSave}
                                        style={{float: "right", marginRight: 50}}>Kaydet
                            </button> </div>}
                            labelPlacement="start"

                        />



                        </div>

                    </Form>
                </Box>

            </div>

        </div>
    )

}