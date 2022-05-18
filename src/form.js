import React, {Component} from "react";
import {Form, Label} from "reactstrap";
import './App.css';
// import CategoryCombo from "./categoryCombo";
import {Box, FormControlLabel, TextField, Checkbox} from "@mui/material";



class  FormUI extends Component {
    render() {

        return (

            <div className="card">
                <br/>
                <h4 style={{marginLeft: 20, marginBottom: 50}}>ÜRÜN BİLGİLERİ</h4>
                <div className="card-body">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Form>

                            <div><FormControlLabel
                                label="Ürün Adı:"
                                control={<TextField id="textfield" name="productName" variant="outlined"
                                                    style={{width: 500}}/>}
                                labelPlacement="start"

                            />
                                <FormControlLabel
                                    label="Ürün Fiyatı:"
                                    control={<TextField id="textfield" name="price" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    label="İndirim:"
                                    control={<TextField id="textfield" name="discount" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    label="Stok Miktarı:"
                                    control={<TextField id="textfield" name="stock" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    label="Barkod:"
                                    control={<TextField id="textfield" name="barcode" variant="outlined"/>}
                                    labelPlacement="start"
                                />

                                {/* <FormControlLabel
                                    label="Kategori:"
                                    control={<CategoryCombo style={{float: "right", marginRight: 50}}/>}
                                    labelPlacement="start"
                                /> */}

                               {/* <FormControlLabel labelPlacement="start"
                                                  control={<Checkbox checked={checked}
                                                                     onChange={(e) => setChecked(e.target.checked)}
                                                                     name="chkAktif"/>} label="Aktif"/>*/}
                                {/*<FormControlLabel labelPlacement="start"  control={<Checkbox defaultChecked value={check} name="chkAktif"  />} label="Aktif" />*/}

                            </div>

                            <div>
                                <button className="button" style={{float: "right", marginRight: 50}}>
                                    <span>Güncelle </span>
                                </button>
                                <button className="glow-on-hover" type="buttonsave"
                                        style={{float: "right", marginRight: 50}}>Kaydet
                                </button>
                            </div>
                        </Form>
                    </Box>

                </div>

            </div>
        )
    }
}
export default FormUI