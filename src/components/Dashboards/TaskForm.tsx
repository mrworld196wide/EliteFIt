import React from 'react';
import { Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface TaskFormProps {
    open: boolean;
    handleClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-apartment"
        >
            <DialogTitle id="edit-apartment">Edit</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add or edit the task
                </DialogContentText>
                <TextField 
                    autoFocus 
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth 
                    variant="outlined" 
                />
                <TextField 
                    autoFocus 
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth 
                    variant="outlined" 
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TaskForm;
