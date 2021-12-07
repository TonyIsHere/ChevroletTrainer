import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import CancelIcon from '@mui/icons-material/Close';
import ValidateIcon from '@mui/icons-material/Check';

import AddCustomer from './AddCustomers';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import AddTraining from './AddTrainings';

import { ExportToCsv } from 'export-to-csv';

function CustomersList() {
    const gridRef = React.useRef();
    const [customers, setCustomers] = useState([]);


    function editRow(value) {
        console.log(value);
        gridRef.current.startEditingCell({
            rowIndex: value.node.rowIndex,
            colKey: 'firstname',
        });
    }


    /* 
    */

    /*
     <div>
                    <Button size="small" color="success"  onClick={_ => validateEdit(params)}><ValidateIcon/> </Button>
                    <Button size="small" color="error" onClick={_ => cancelEdit(params)} ><CancelIcon/> </Button>
                    <AddTraining link={params.value} callback={addTraining}/>
                </div>
    */





    function actionBtn(params) {
        let editingCells = gridRef.current.getEditingCells();
        let isCurrentRowEditing = editingCells.some((cell) => {
            return cell.rowIndex === params.node.rowIndex;
        });

        // console.log(isCurrentRowEditing);

        if (isCurrentRowEditing) {
            return (<div>
                <Button size="small" color="success" onClick={_ => validateEdit(params)}><ValidateIcon /> </Button>
                <Button size="small" color="error" onClick={_ => cancelEdit(params)} ><CancelIcon /> </Button>
                <AddTraining link={params.value} callback={addTraining} />
            </div>);
        } else {
            return (
                <div>
                    <Button size="small" color="error" onClick={_ => deleteCustomers(params)}><DeleteIcon /> </Button>
                    <Button size="small" color="primary" onClick={_ => editRow(params)} ><EditIcon /> </Button>
                    <AddTraining link={params.value} callback={addTraining} />
                </div>);
        }
    }


    //https://blog.ag-grid.com/full-row-editing-ag-grid-committing-changes-button-click/
    //https://www.ag-grid.com/javascript-data-grid/view-refresh/#refresh-cells
    function cancelEdit(e) {
        console.log("cancel");
        console.log(e);
        gridRef.current.stopEditing(true);
    }

    function validateEdit(e) {
        console.log("validate");
        gridRef.current.stopEditing(false);
        console.log(e);
    }



    //CHANGE field
    const columns = [
        {
            headerName: "Action",
            minWidth: 300,
            field: "links",
            valueGetter: (params) => {
                return params.data.links[0].href;
            },
            editable: false,
            cellRendererFramework: actionBtn,
        },
        {
            headerName: "Firstname",
            field: "firstname",
            sortable: true,
            filter: true
        },
        {
            headerName: "Lastname",
            field: "lastname",
            sortable: true,
            filter: true
        },
        {
            headerName: "Email",
            field: "email",
            sortable: true,
            filter: true
        },
        {
            headerName: "Phone",
            field: "phone",
            sortable: true,
            filter: true
        },
        {
            headerName: "Address",
            field: "streetaddress",
            sortable: true,
            filter: true
        },
        {
            headerName: "Postcode",
            field: "postcode",
            sortable: true,
            filter: true
        },
        {
            headerName: "City",
            field: "city",
            sortable: true,
            filter: true
        }
    ]


    function onRowValueChanged(event) {
        var data = event.data;
        console.log("update data")

        fetch(data.links[0].href, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => fetchData())
            .catch(err => console.error(err))


    }


    const deleteCustomers = data => {
        if (window.confirm("Are you sure?")) {
            console.log("delete");
            let url = data.value;
            console.log("id :" + url);

            fetch(url, {
                method: "DELETE"
            }).then(response => fetchData())
                .catch(err => console.error(err))

        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/api/customers');
            const data = await response.json();
            setCustomers(data.content);
        }
        catch (error) {
            console.error(error);
        }
    }

    const addCustomer = customer => {
        console.log("add new customer");
        console.log(customer);
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        }).then(response => fetchData())
            .catch(err => console.error(err))

    }

    const addTraining = training => {
        console.log("add new training");




        console.log(training);
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(training)
        }).then(response => fetchData())
            .catch(err => console.error(err))
    }


    React.useEffect(_ => fetchData(), []);


    const onFilterTextChange = (e) => {
        gridRef.current.setQuickFilter(e.target.value)
    }

    const onClickExport = e => {
        console.log("export");
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Export Customers',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);
        let dataExport = JSON.parse(JSON.stringify(customers)); //create clone without reference
        console.log(dataExport);
        dataExport.map(x => {
            delete x.links;
            delete x.content;
            return x
        })
        csvExporter.generateCsv(dataExport);
    }

    return (
        <>
            <h1>Customers</h1>
            <div className="ag-theme-alpine" style={{ height: 400, margin: 'auto' }}>
                <TextField onChange={onFilterTextChange} placeholder="search somethings..." variant="standard" InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }} />
                <AddCustomer callback={addCustomer} />
                <Button onClick={onClickExport}>Export csv</Button>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => { gridRef.current = params.api; }}
                    rowSelection="single"
                    animateRows="true"
                    columnDefs={columns}
                    defaultColDef={{ flex: 1, editable: true }}
                    editType="fullRow"
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={5}
                    suppressCellSelection={true}
                    suppressClickEdit={true}
                    onRowValueChanged={onRowValueChanged}
                    onCellEditingStarted={params => {
                        // console.log(params);
                        params.api.refreshCells({
                            columns: ['links'],
                            force: true,
                        });

                    }}
                    onCellEditingStopped={params => {
                        //  console.log(params);
                        params.api.refreshCells({
                            columns: ['links'],
                            force: true,
                        });

                    }}
                >
                </AgGridReact>
            </div>
        </>);
}

export default CustomersList;