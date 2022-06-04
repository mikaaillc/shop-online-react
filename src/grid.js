
import React, { useCallback, useRef, useState,useEffect } from 'react';
import FormUI from "./form";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
    FormControlLabel,
    Checkbox,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Dialog, Box
} from "@mui/material";
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { MenuItem, Select} from "@mui/material";
import * as moment from 'moment';
import Slide from '@mui/material/Slide';
import {BarChart} from "./barChart";


//forma gönderilen veriler
var prodId = {value: null};
var deletedProd;
var activeCheck = {value: null};
var category = {value: null};

//ürün bilgileri için config
var axios = require('axios');
var config = {
    method: 'get',
    url: 'http://localhost:8082/Product/getAllProduct'
};

//bar chart için
var categoryArray=[];
//endregion

export default function Grid(props) {

    // region Select box Load
    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8082/Category/getAllCategory")
            .then((response) => {
                setList(response.data);
                response.data.forEach((data) => {//barchart label lar için foeach
                    categoryArray.push(data.categoryName)
                })
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);
    //endregion

    // region Grid Load
    const [prodlist, setprodlist] = useState([]);
    useEffect(() => {
        axios(config)
            .then(function (response) {
                setprodlist(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    //endregion

    //region grid işlemleri
    const gridRef = useRef();
    const onSelectionChanged = useCallback((props) => {
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
        prodId.value = selectedRows[0].id;
        deletedProd = selectedRows[0].id;
        activeCheck.value = selectedRows[0].active
        category.value = selectedRows[0].category
        // if (selectedRows[0].active== true){
        //     setChecked((checked) => true);
        // }else{
        //     setChecked((checked) => false);// constların valuları setlenirken arrow func kullnılır
        // }

    }, []);

    function AgGridCheckbox(props) {
        const boolValue = props.value && props.value.toString() === 'true';
        const [isChecked, setIsChecked] = useState(boolValue);
        const onChanged = () => {
            props.setValue(!isChecked);
            setIsChecked(!isChecked);
        };
        return (
            <div>
                <input type="checkbox" checked={isChecked} onChange={onChanged}/>
            </div>
        );
    }

    function AgGridcombo(props) {
        const category = props.value;
        const [categoryValue, setcategoryValue] = useState(category);
        const onChanged = (event) => {
            props.setValue(event.target.value);//props value değitiriliyor
            setcategoryValue(event.target.value);
        };
        return (
            <div>
                <Select
                    name='combovalue'
                    value={categoryValue}
                    onChange={onChanged}
                    style={{

                        marginBottom: 5,
                        marginTop: 5,
                        width: 200,
                        height: 40,
                        backgroundColor: "whitesmoke",
                        marginRight: 50
                    }}

                >
                    {list.map((item) => (
                        <MenuItem key={item.id} value={item.categoryName}>
                            {item.categoryName}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    }

    function DeleteButton() {
        const [open, setOpen] = useState(false);
        const Transition = React.forwardRef(function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
        const showWarninig = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        const DeleteProd = () => {
            var configdelete = {
                method: 'delete',
                url: 'http://localhost:8082/Product/deleteByProductId/' + deletedProd,//gridden seiçilen ürün id
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios(configdelete)
                .then(function (response) {
                    setOpen(false);
                    axios(config)
                        .then(function (response) {
                            setprodlist(response.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return (
            <div style={{
                marginTop: 5,
            }}>

                <Button onClick={showWarninig} variant="outlined" startIcon={<DeleteIcon/>} style={{color: "#c05f5f"}}>
                    DELETE
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"UYARI!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Ürünü Silmek İstediğinize Emin misiniz?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box
                            className="box"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                        <Button onClick={handleClose}>Vazgeç</Button>
                        <Button onClick={DeleteProd}>Sil</Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    // grid zaman formatı için
    function dateFormatter(params) {
        return moment(params.value).format('MM/DD/YYYY HH:mm');
    }

    const columns = [
        {field: 'productName', width: 150, headerName:"Ürün Adı"},
        {field: 'price',width: 150,headerName:" Ürün Fiyat"},
        {field: 'stock', width: 100,headerName:"Adet"},
        {field: 'discount', width: 150,headerName:"İndirim"},
        {field: 'createDate',headerName:"Kayıt Zamanı",
            valueFormatter: dateFormatter},
        {field: 'barcode', width: 180,headerName:"Barkod"},
        {
            field: 'active',
            headerName:"Aktif",
            width: 100,
            cellRendererFramework: AgGridCheckbox,
            editable: false
        },
        {
            headerName: 'Kategori',
            field: 'category.categoryName',
            width: 220,
            cellRendererFramework: AgGridcombo,
            editable: false
        }, {
            width: 150,
            cellRendererFramework: DeleteButton,

        }];
    // endregion

    //region sorgu işlemleri
    const [checked, setChecked] = useState(false);
    const handleChangeActive = (event) => {
        setChecked(event.target.checked)
        axios
            .get("http://localhost:8082/Product/getProductsByActive/", {
                params: {
                    active: event.target.checked
                }
            })
            .then((response) => {
                gridRef.current.api.setRowData(response.data)
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }
    const handleChangeCombo = (event) => {
        setCategoryName(event.target.value);//comboya görünecek kategoriyi setlemek için
        if (event.target.value == 'Tumu') {
            axios
                .get(config.url,
                )
                .then((response) => {
                    gridRef.current.api.setRowData(response.data)
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        } else {
            var value = list.filter(function (item) {
                if (item.categoryName == event.target.value)
                    return item.id
            })
            axios
                .get("http://localhost:8082/Product/getProductsByCategoryId", {
                    params: {
                        categoryId: value[0].id
                    }
                })
                .then((response) => {
                    gridRef.current.api.setRowData(response.data)
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        }


    };
    //endregion

    return (
        <div className="ag-theme-alpine-dark" style={{height: 1000, width: 1800}}>
            <BarChart categoryArray={categoryArray}/>
            <div id="form" style={{marginBottom: 10, marginTop: 20, marginLeft: 0}}>
                <FormUI prodId={prodId} activeCheck={activeCheck}
                        category={category}/>{/*seçilen productid forma gönderildi*/}

            </div>

            <div className="ag-theme-alpine-dark" style={{height: 400, width: 1800}}>
                <AgGridReact
                    className="grid"
                    rowData={prodlist}
                    columnDefs={columns}
                    ref={gridRef}
                    rowHeight={50}
                    rowSelection={'single'}
                    onSelectionChanged={onSelectionChanged}
                    //onRowClicked={handleChange}

                >
                </AgGridReact>
            </div>
            <div style={{marginTop: 20}}>
                <FormControlLabel labelPlacement="start"
                                  style={{alignSelf: 'flex-end'}}
                                  control={<Checkbox checked={checked}
                                                     onChange={handleChangeActive}
                                  />} label="Aktif"/>


                <FormControlLabel
                    label="Kategori:"
                    control={
                        <Select
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
                            // renderValue={
                            //     () => <MenuItem> {props.placeholder}</MenuItem>
                            // }
                        >
                            <MenuItem value='Tumu'>
                                Tümü
                            </MenuItem>
                            {list.map((item) => (
                                <MenuItem key={item.id} value={item.categoryName}>
                                    {item.categoryName}
                                </MenuItem>
                            ))}
                        </Select>

                    }//props kullanımı için
                    labelPlacement="start"

                />
            </div>


        </div>
    );
};
