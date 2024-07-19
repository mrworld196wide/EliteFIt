import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import { SxProps } from '@mui/system';
import Icon from '@mui/material/Icon';
import { useDrag } from 'react-dnd';

import { ItemTypes } from './ItemTypes';

export interface TaskProps {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
}

interface TaskCardProps {
    task: TaskProps;
    handleTaskDelete: (id: number) => void;
    handleTaskEdit: (task: TaskProps) => void;
    handleDragDropMovement: (taskId: number, targetStatus: string) => void; // Include handleDragDropMovement in props
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    handleTaskDelete,
    handleTaskEdit,
    handleDragDropMovement // Ensure handleDragDropMovement is included in props
}) => {
    const { id, title, description, status, priority, dueDate } = task;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: {
            taskId: id,
            status
        }
    }));

    const priorityColor = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : '#E4D00A';

    return (
        <Card
            ref={drag}
            sx={{
                ...cardStyle,
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: isDragging ? '#1976d2' : 'white'
            }}
        >
            <CardContent>
                <h4>
                    {title}
                    <span onClick={() => handleTaskDelete(id)}>
                        <Icon style={{ float: 'right' }} color="primary">delete</Icon>
                    </span>
                    <span onClick={() => handleTaskEdit(task)}>
                        <Icon style={{ float: 'right' }} color="primary">edit</Icon>
                    </span>
                </h4>
                <p>{description}</p>
                <CardActions sx={{ justifyContent: 'flex-start', padding: '0' }}>
                    <div
                        style={{
                            border: `1px solid ${priorityColor}`,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            color: priorityColor
                        }}
                    >
                        {priority}
                    </div>
                    <div style={{ marginLeft: 'auto', padding: '2px 8px' }}>
                        Due Date: {dueDate}
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    );
};

const cardStyle: SxProps = {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '20px',
    color: 'rgb(68, 66, 66)'
}

export default TaskCard;
