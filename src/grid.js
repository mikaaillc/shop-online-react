import React, {useCallback, useRef, useState, useEffect} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
    FormControlLabel,
    Checkbox,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, Dialog, Box, TextField
} from "@mui/material";
import './App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {MenuItem, Select} from "@mui/material";
import * as moment from 'moment';
import Slide from '@mui/material/Slide';
import {BarChart} from "./barChart";
import {Form} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//forma gönderilen veriler
var deletedProd;

//ürün bilgileri için config
var axios = require('axios');
var config = {
    method: 'get',
    url: 'http://localhost:8082/Product/getAllProduct'
};

//endregion

// region category combo load
var categories = null;
var configCategory= {
    method: 'get',
    url: "http://localhost:8082/Category/getAllCategoryByActive?active=1"//aktif kategorileri getirmek için
};
axios(configCategory)
    .then(function (response) {
        categories = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
//endregion
// region aktif check denemesi
/*function CheckAktif(props) {
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
    const checkActiveChange = (event) => {
        debugger;
        setChecked(event.target.checked);
    }

    return  (
        <Checkbox  checked={checked}
        onClick={checkActiveChange}
        name="chkAktif"  />
    );
  }*/
//endregion

export default function Grid(props) {

    // region Select box Load
    const [checkedAktif, setCheckedAktif] = useState(false);
    const [list, setList] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [categoryArray ]=useState([]);//barchart için kategori array
    const [categoryData]=useState([]);//barchart data
    const [maxCategoryValue,setMaxCategoryValue]=useState(5);
    useEffect(() => {
        axios
            .get("http://localhost:8082/Category/getAllCategoryByActive?active=1")//aktif kategorileri getirmek için
            .then((response) => {
                setList(response.data);
                // response.data.forEach((data) => {//barchart label lar için foeach
                //     categoryArray.push(data.categoryName)
                // })
            })
            .catch((e) => {
                console.log(e.response.data);
            });
    }, []);
    //endregion

    // region barchart load
    useEffect(() => {
        axios
            .get("http://localhost:8082/Category/getCategoryData")
            .then((response) => {
                response.data.forEach((data) => {//barchart label lar için foeach
                    categoryArray.push(data[1])
                    categoryData.push(data[0])
                })
                setMaxCategoryValue(Math.max(...categoryData)+1)//max kategori verisi alınıyor
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
        const fakeEvent = {//combo setlemek için yapılan yapı fake event oluşturularak combodan seçim yapılmış gibi yazıldı
            target: {
                value: selectedRows[0].category.categoryName
            }
        }
        handleChangeComboValue(fakeEvent)
        deletedProd = selectedRows[0].id;
        if (selectedRows[0].active== true){
            setCheckedAktif((checked) => true);
        }else{
            setCheckedAktif((checked) => false);// constların valuları setlenirken arrow func kullnılır
        }

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
                <input type="checkbox" name="aktif" disabled={true} checked={isChecked} onChange={onChanged}/>
            </div>
        );
    }

    /*function AgGridcombo(props) {
        const category = props.value;
        const [categoryValue, setcategoryValue] = useState(category);
        const onChanged = (event) => {
            props.setValue(event.target.value);//props value değitiriliyor
            setcategoryValue(event.target.value);
        };
        return (
            <div>
                <Select
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
    }*/

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

    // region save ve update
    const handleSubmitSave = () => {
        /* const formData = new FormData(event.target)//form getvalue
        const data = {}

        event.preventDefault()

        for (let entry of formData.entries()) {
            data[entry[0]] = entry[1]
        }*/

        var productName = document.querySelector('Input[name = "productName"]').value
        var discount = document.querySelector('Input[name = "discount"]').value
        var price = document.querySelector('Input[name = "price"]').value
        var stock = document.querySelector('Input[name = "stock"]').value
        var barcode = document.querySelector('Input[name = "barcode"]').value
        var active =checkedAktif//ürün ilk kayıt yapılırken aktif kontrolü için
        var combovalue = document.querySelector('Input[name = "combovalue"]').value


        var value = categories.filter(function (item) {
            if (item.categoryName === combovalue)//secilmiş olan combonun valuesu
                return item.id
        })

        var data = JSON.stringify({
            "productName": productName,
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

        var configSave = {
            method: 'post',
            url: 'http://localhost:8082/Product/addProduct',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(configSave)
            .then(function (response) {
                axios(config)//grid load oldu
                    .then(function (response) {
                        toast.success("İşlem Başarılı!");
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
    const handleSubmitUpdate = () => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        var productName = document.querySelector('Input[name = "productName"]').value
        var discount = document.querySelector('Input[name = "discount"]').value
        var price = document.querySelector('Input[name = "price"]').value
        var stock = document.querySelector('Input[name = "stock"]').value
        var barcode = document.querySelector('Input[name = "barcode"]').value
        var active =checkedAktif
        var combovalue =  document.querySelector('Input[name = "combovalue"]').value
        var value = categories.filter(function (item) {
            if (item.categoryName === combovalue)//secilmiş olan combonun valuesu
                return item.id
        })


        var data = JSON.stringify({
            "productName": productName,
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

        var configUpdate = {
            method: 'put',
            url: 'http://localhost:8082/Product/updateProduct/' +selectedRows[0].id,//gridden seiçilen ürün id
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(configUpdate)
            .then(function (response) {
                //todo show alert
                console.log(JSON.stringify(response.data));
                axios(config)
                    .then(function (response) {
                        toast.success("İşlem Başarılı!");
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
    // endregion
    function DeleteButton() {
        
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
                    setOpen(false);//kutucuk kapandı
                    axios(config)//grid load oldu
                        .then(function (response) {
                            toast.success("İşlem Başarılı!");
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
                    ÜRÜN SİL
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
        {field: 'productName', width: 200, headerName: "Ürün Adı",sortable: true ,
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200
            }},
        {field: 'price', width: 160, headerName: " Ürün Fiyat",sortable: true},
        {field: 'stock', width: 110, headerName: "Adet",sortable: true},
        {field: 'discount', width: 160, headerName: "İndirim",sortable: true},
        {
            field: 'createDate', headerName: "Kayıt Zamanı",
            valueFormatter: dateFormatter
        },
        {field: 'barcode', width: 180, headerName: "Barkod",
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200
            }},
        {
            field: 'active',
            headerName: "Aktif",
            width: 110,
            cellRendererFramework: AgGridCheckbox,
            editable: false
        },
        {
            headerName: 'Kategori',
            field: 'category.categoryName',
            width: 220,
  /*          cellRendererFramework: AgGridcombo,
            editable: false*/
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

    // region combo işlemleri
    const handleChangeComboValue = (event) => {
        setCategoryName(event.target.value);//comboya görünecek kategoriyi setlemek için
    };
    // endregion

    return (
        <div className="ag-theme-alpine-dark" style={{height: 1000, width: 1800}}>
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
            <BarChart categoryArray={categoryArray} categoryData={categoryData} maxCategoryValue={maxCategoryValue}/>
            <div id="form" style={{marginBottom: 10, marginTop: 20, marginLeft: 250}}>
                <div className="card">

                    <br/>
                    <h3 id="label" style={{marginLeft: 20, marginBottom: 30}}>ÜRÜN BİLGİLERİ</h3>
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
                                    label="Ürün Adı:"
                                    id="label"
                                    control={<TextField id="textfield" name="productName" variant="outlined"
                                                        style={{marginLeft:5,width: 500}}
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
                                        control={<TextField id="textfield" name="discount" variant="outlined"
                                        />}
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
                                            <Select
                                                name='combovalue'
                                                value={categoryName}
                                                onChange={handleChangeComboValue}
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
                                                {categories.map((item) => (
                                                    <MenuItem  key={item.id} value={item.categoryName}>
                                                        {item.categoryName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        }
                                        labelPlacement="start"

                                    />
                                    <FormControlLabel labelPlacement="start"
                                                  id="label"
                                                  style={{alignSelf: 'flex-end'}}
                                                  control={<Checkbox checked={checkedAktif} onClick={(e)=>setCheckedAktif(!checkedAktif)} name="activeCheck" />} label="Aktif" />


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
                            </Form>
                            <div>
                                <button className="button" style={{float: "right", marginRight: 50}}
                                        onClick={handleSubmitUpdate}>
                                    <span>Güncelle </span>
                                </button>
                                <button className="glow-on-hover"
                                        onClick={handleSubmitSave}
                                        categories={categories}
                                        style={{float: "right", marginRight: 50}}>Kaydet
                                </button>
                            </div>

                        </Box>

                    </div>

                </div>

            </div>

            <div id="form2" style={{height: 400, width: 1560,marginLeft: 250}}>
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
