
import {Form} from "reactstrap";
import './App.css';
import {Box, FormControlLabel, TextField, Checkbox, Select, MenuItem} from "@mui/material";
import React, { useState,useEffect } from 'react';
var axios = require('axios');

function CheckAktif(props) {
    const [checked, setChecked] = useState(false);
    var check  = props.activeCheck.value
    if (check== true){
        setChecked((checked) => true);
        props.activeCheck.value=null
    }
    if (check== false){
        setChecked((checked) => false);
        props.activeCheck.value=null
    }
    return  (
        <Checkbox  checked={checked}
        onClick={() => setChecked(!checked)}
        name="chkAktif"  />
    );
  }

  function SelectCategory(props) {
    const [checked, setChecked] = useState(false);
    var check  = props.activeCheck.value
    if (check== true){
        setChecked((checked) => true);
        props.activeCheck.value=null
    }
    if (check== false){
        setChecked((checked) => false);
        props.activeCheck.value=null
    }
    return  (
        <Select
        name = 'combovalue'
        value={categoryName}
        onChange={handleChangeCombo}
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

    >
        {list.map((item) => (
            <MenuItem key={item.id} value={item.categoryName}>
                {item.categoryName}
            </MenuItem>
        ))}
    </Select>
    );
  }


export default function FormUI (props){
    const [categoryName, setCategoryName] = useState([]); 

    const handleChangeCombo = (event) => {
        setCategoryName(event.target.value);//comboya görünecek kategoriyi setlemek için

    };

    const handleSubmitSave =() => {
        var productName =document.querySelector('Input[name = "productName"]').value
        var discount =document.querySelector('Input[name = "discount"]').value
        var price =document.querySelector('Input[name = "price"]').value
        var stock =document.querySelector('Input[name = "stock"]').value
        var barcode =document.querySelector('Input[name = "barcode"]').value
        var active =document.querySelector('Input[name = "chkAktif"]').value
        var combovalue =document.querySelector('Input[name = "combovalue"]').value
        if(active=='on')
            active=true;
        else
            active=false;

        var value = list.filter(function (item) {
            if (item.categoryName == combovalue)//secilmiş olan combonun valuesu
                return item.id
        })

        var data = JSON.stringify({
            "productName": productName ,
            "discount": discount,
            "price": price,
            "stock": stock,
            "active": active,
            "barcode": barcode,
            "category": {
                "id": value[0].id
            },
            "userId": 1 // todo giriş yapan kullanıcının id si
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8082/Product/addProduct',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    const handleSubmitUpdate  =() => {

        var productName =document.querySelector('Input[name = "productName"]').value
        var discount =document.querySelector('Input[name = "discount"]').value
        var price =document.querySelector('Input[name = "price"]').value
        var stock =document.querySelector('Input[name = "stock"]').value
        var barcode =document.querySelector('Input[name = "barcode"]').value
        var active =document.querySelector('Input[name = "chkAktif"]').value
        var combovalue =document.querySelector('Input[name = "combovalue"]').value
        if(active=='on')
            active=true;
        else
            active=false;

        var value = list.filter(function (item) {
            if (item.categoryName == combovalue)//secilmiş olan combonun valuesu
                return item.id
        })


        var data = JSON.stringify({
            "productName": productName ,
            "discount": discount,
            "price": price,
            "stock": stock,
            "active": active,
            "barcode": barcode,
            "category": {
                "id": value[0].id
            },
            "userId": 1 // todo giriş yapan kullanıcının id si
        });

        var config = {
            method: 'put',
            url: 'http://localhost:8082/Product/updateProduct/'+props.prodID,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const [list, setList] = useState([]);
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
        return (


            <div className="card">
                <br/>
                <h4 id="label" style={{marginLeft: 20, marginBottom: 50}}>ÜRÜN BİLGİLERİ</h4>
                <div className="card-body">

                    <Box
                        className="box"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Form >
                            <div><FormControlLabel
                                label="Ürün Adı:"
                                id="label"
                                control={<TextField id="textfield" name="productName" variant="outlined"
                                                    style={{width: 500}}
                                />}
                                labelPlacement="start"

                            />
                                <FormControlLabel
                                    label="Ürün Fiyatı:"
                                    id="label"
                                    control={<TextField id="textfield" name="price" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    label="İndirim:"
                                    id="label"
                                    control={<TextField id="textfield" name="discount" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    label="Stok Miktarı:"
                                    id="label"
                                    control={<TextField id="textfield" name="stock" variant="outlined"/>}
                                    labelPlacement="start"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    label="Barkod:"
                                    id="label"
                                    control={<TextField id="textfield" name="barcode" variant="outlined"/>}
                                    labelPlacement="start"
                                />

                                <FormControlLabel
                                    label="Kategori:"
                                    id="label"
                                    control={
                                        <SelectCategory category={props.category} />
                                    }//props kullanımı için
                                    labelPlacement="start"

                                />
                                <FormControlLabel labelPlacement="start"
                                                  id="label"
                                                  style={{alignSelf: 'flex-end'}}
                                                  control={<CheckAktif activeCheck={props.activeCheck} />} label="Aktif" />





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
                                <button className="button" style={{float: "right", marginRight: 50}} onClick={handleSubmitUpdate}>
                                    <span>Güncelle </span>
                                </button>
                                <button className="glow-on-hover" onClick={handleSubmitSave}
                                        style={{float: "right", marginRight: 50}}>Kaydet
                                </button>
                            </div>
                        </Form>
                    </Box>

                </div>

            </div>
        )

}
