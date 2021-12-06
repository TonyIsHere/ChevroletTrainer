import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

function AddTraining(props)
{
    const [open, setOpen] = React.useState(false);
    const [training,setTraining] = React.useState({
        date:"",
        activity:"",
        duration:"",
        customerlink:props.link
    })
    const handleClickOpen = () => {
      setOpen(true);

      //reset var when it's loaded
      setTraining({
        date:"",
        activity:"",
        duration:"",
        customerlink:props.link
    });
    };
  
    const handleClose = () => {
      setOpen(false);
      setTraining({
        date:"",
        activity:"",
        duration:"",
        customerlink:""
    });
    };

    const handleSave = () => {
        props.callback(training);
        handleClose();
      };

    const inputChanged = e => {
      setTraining({...training,[e.target.name]:e.target.value})
    }

       return (
    <>
      <Button onClick={handleClickOpen}>Add Training</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            type="date"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
            <TextField
            margin="dense"
            name="duration"
            type="number"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
     
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTraining;