import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import { TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTraining from './AddTrainings';

function TrainingList() {
    const gridRef = React.useRef();
    const [trainings, setTrainings] = useState([]);

    const columns = [
        {
            headerName: "Action",
            field: "id",
            cellRendererFramework: (params) => <Button size="small" color="error" onClick={_ => deleteTraining(params)} ><DeleteIcon/> </Button>,
        },
        {
            headerName: "Activity",
            field: "activity",
            sortable: true,
            filter: true
        },
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Duration (min)",
            field: "duration",
            sortable: true,
            filter: true
        },
        {
            headerName: "Customer",
            field: "fullname",
            sortable: true,
            filter: true
        },
    ]

    const deleteTraining = data => {
        if (window.confirm("Are you sure?")) {
            console.log("delete");
            let url = "https://customerrest.herokuapp.com/api/trainings/"+data.value;
        console.log("id :"+ url);
        }
      };



    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/gettrainings');
            const data = await response.json();
            let content = data;
            content.map(x => x.date = moment(x.date).format("DD.MM.YYYY hh:mm a"));
            content.map(x => x.fullname = x.customer.firstname + " " + x.customer.lastname)
            setTrainings(content);
        }
        catch (error) {
            console.error(error);
        }
    }
    React.useEffect(_ => fetchData(), []);


  
    

    const onFilterTextChange = (e) => {
        gridRef.current.setQuickFilter(e.target.value)
    }

 

    return (
        <>
        <h1>Trainings</h1>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%", margin: 'auto' }}>
            <TextField  onChange={onFilterTextChange} placeholder="search somethings..."  variant="standard" InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
            }} />
            <AgGridReact
                ref={gridRef}
                onGridReady={params => {gridRef.current = params.api;  gridRef.current.sizeColumnsToFit();}}
                rowSelection="single"
                animateRows="true"
                columnDefs={columns}
                rowData={trainings}
                pagination={true}
                paginationPageSize={5}
                suppressCellSelection={true}
            >
            </AgGridReact>
        </div>
        </>);
}

export default TrainingList;