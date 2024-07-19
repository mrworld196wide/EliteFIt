import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './App.css';
import StatusBox from './components/StatusBox';
import { TaskProps } from './components/TaskCard';
import CreateTaskForm from './components/CreateTaskForm';

const taskData = [
    {
        id: 1634608610128,
        title: 'Change HTTP response code',
        description: 'Exposure service needs to return 400 on Internal error!',
        status: 'Open',
        priority: 'High',
        dueDate: '24-07-2024'
    },
    {
        id: 1634609119836,
        title: 'Remove raven vulnerabilities',
        description: 'Upgrade packages to remove open source vulnerabilities!',
        status: 'Open',
        priority: 'Medium',
        dueDate: '19-08-2024'
    },
    {
        id: 1634609132346,
        title: 'Migrate maven repo to managed',
        description: 'Maven needs to consume libraries from new Managed repos!',
        status: 'In Progress',
        priority: 'Low',
        dueDate: '30-08-2024'
    },
    {
        id: 1634609149897,
        title: 'Update notification message',
        description: 'OTP notification message should be clear',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: '20-07-2024'
    },
    {
        id: 1634609162907,
        title: 'Add multiple tenants feature',
        description: 'Owner should be able to add multiple tenants in a room!',
        status: 'Done',
        priority: 'High',
        dueDate: '10-07-2024'
    }
];

function App() {
    const [allTasks, setAllTasks] = useState<TaskProps[]>(taskData);
    const [doneTask, setDoneTask] = useState<TaskProps[]>(taskData.filter(task => task.status === 'Done'));
    const [progressTask, setProgressTask] = useState<TaskProps[]>(taskData.filter(task => task.status === 'In Progress'));
    const [openTask, setOpenTask] = useState<TaskProps[]>(taskData.filter(task => task.status === 'Open'));
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterPriorities, setFilterPriorities] = useState<{ [key: string]: boolean }>({
        High: false,
        Medium: false,
        Low: false
    });

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

    const handleDragDropMovement = (taskId: number, targetStatus: string) => {
        const updatedTasks = allTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: targetStatus };
            }
            return task;
        });

        setAllTasks(updatedTasks);
        setDoneTask(updatedTasks.filter(task => task.status === 'Done'));
        setProgressTask(updatedTasks.filter(task => task.status === 'In Progress'));
        setOpenTask(updatedTasks.filter(task => task.status === 'Open'));
    };

    const handleTaskDelete = (id: number) => {
        const updatedTasks = allTasks.filter(task => task.id !== id);
        setAllTasks(updatedTasks);
        setDoneTask(updatedTasks.filter(task => task.status === 'Done'));
        setProgressTask(updatedTasks.filter(task => task.status === 'In Progress'));
        setOpenTask(updatedTasks.filter(task => task.status === 'Open'));
    };

    const handleTaskEdit = (task: TaskProps) => {
        setSelectedTask(task);
        toggleModal();
    };

    const handleCreateTask = () => {
        setSelectedTask(null);
        toggleModal();
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPriorities({
            ...filterPriorities,
            [event.target.name]: event.target.checked
        });
    };

    const filteredTasks = (tasks: TaskProps[]) => {
        const searchFiltered = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
        const priorityFiltered = searchFiltered.filter(task => {
            if (!filterPriorities.High && !filterPriorities.Medium && !filterPriorities.Low) {
                return true;
            }
            return filterPriorities[task.priority];
        });
        return priorityFiltered;
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <div className="header">
                    <h1>Simple Task Management</h1>
                    <TextField
                        className="search"
                        label="Search Tasks"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: "30%", ml: '10%', mr: '15%', backgroundColor: 'white' }}
                    />
                    <Button variant="contained" onClick={handleCreateTask}>
                        Create Task
                    </Button>
                    <Button variant="contained" onClick={toggleFilterModal}>
                        Filter
                    </Button>
                    <Modal
                        open={modalOpen}
                        onClose={toggleModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <CreateTaskForm
                            doneTask={doneTask}
                            setDoneTask={setDoneTask}
                            openTask={openTask}
                            setOpenTask={setOpenTask}
                            progressTask={progressTask}
                            setProgressTask={setProgressTask}
                            toggleModal={toggleModal}
                            allTasks={allTasks}
                            setAllTasks={setAllTasks}
                            selectedTask={selectedTask}
                        />
                    </Modal>
                    <Dialog open={filterModalOpen} onClose={toggleFilterModal}>
                        <DialogTitle>Filter Tasks</DialogTitle>
                        <DialogContent>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    {Object.keys(filterPriorities).map(priority => (
                                        <FormControlLabel
                                            key={priority}
                                            control={
                                                <Checkbox
                                                    checked={filterPriorities[priority]}
                                                    onChange={handleFilterChange}
                                                    name={priority}
                                                />
                                            }
                                            label={priority}
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleFilterModal} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="row">
                    <div className="col col-1">
                        <StatusBox
                            status="Open"
                            taskData={filteredTasks(openTask)}
                            handleDragDropMovement={handleDragDropMovement}
                            handleTaskDelete={handleTaskDelete}
                            handleTaskEdit={handleTaskEdit} // Correctly pass handleTaskEdit function
                        />
                    </div>
                    <div className="col col-2">
                        <StatusBox
                            status="In Progress"
                            taskData={filteredTasks(progressTask)}
                            handleDragDropMovement={handleDragDropMovement}
                            handleTaskDelete={handleTaskDelete}
                            handleTaskEdit={handleTaskEdit} // Correctly pass handleTaskEdit function
                        />
                    </div>
                    <div className="col col-3">
                        <StatusBox
                            status="Done"
                            taskData={filteredTasks(doneTask)}
                            handleDragDropMovement={handleDragDropMovement}
                            handleTaskDelete={handleTaskDelete}
                            handleTaskEdit={handleTaskEdit} // Correctly pass handleTaskEdit function
                        />
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}

export default App;
