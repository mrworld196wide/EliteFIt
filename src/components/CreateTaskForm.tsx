import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TaskProps } from './TaskCard';

interface CreateTaskFormProps {
    doneTask: Array<TaskProps>;
    setDoneTask: (tasks: Array<TaskProps>) => void;
    openTask: Array<TaskProps>;
    setOpenTask: (tasks: Array<TaskProps>) => void;
    progressTask: Array<TaskProps>;
    setProgressTask: (tasks: Array<TaskProps>) => void;
    toggleModal: () => void;
    allTasks: Array<TaskProps>;
    setAllTasks: (tasks: Array<TaskProps>) => void;
    selectedTask: TaskProps | null; // Include selectedTask in the props
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
    doneTask,
    setDoneTask,
    openTask,
    setOpenTask,
    progressTask,
    setProgressTask,
    toggleModal,
    allTasks,
    setAllTasks,
    selectedTask
}) => {
    const [title, setTitle] = useState<string>(selectedTask ? selectedTask.title : '');
    const [description, setDescription] = useState<string>(selectedTask ? selectedTask.description : '');
    const [priority, setPriority] = useState<string>(selectedTask ? selectedTask.priority : 'Low');
    const [dueDate, setDueDate] = useState<string>(selectedTask ? selectedTask.dueDate : '');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setPriority(selectedTask.priority);
            setDueDate(selectedTask.dueDate);
        }
    }, [selectedTask]);

    const handleSubmit = () => {
        if (selectedTask) {
            const updatedTasks = allTasks.map(task =>
                task.id === selectedTask.id ? { ...task, title, description, priority, dueDate } : task
            );
            setAllTasks(updatedTasks);
            setOpenTask(updatedTasks.filter(task => task.status === 'Open'));
            setProgressTask(updatedTasks.filter(task => task.status === 'In Progress'));
            setDoneTask(updatedTasks.filter(task => task.status === 'Done'));
        } else {
            const newTask: TaskProps = {
                id: Date.now(),
                title,
                description,
                status: 'Open',
                priority,
                dueDate
            };
            setAllTasks([...allTasks, newTask]);
            setOpenTask([...openTask, newTask]);
        }
        toggleModal();
    };

    return (
        <div style={modalStyle}>
            <h2>{selectedTask ? 'Edit Task' : 'Create Task'}</h2>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as string)}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                {selectedTask ? 'Save Changes' : 'Create Task'}
            </Button>
        </div>
    );
};

const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
};

export default CreateTaskForm;
