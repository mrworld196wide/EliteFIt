import React from 'react';
import TaskCard, { TaskProps } from './TaskCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Typography } from '@mui/material';

export interface StatusBoxProps {
    status: string;
    taskData: TaskProps[];
    handleDragDropMovement: (taskId: number, targetStatus: string) => void;
    handleTaskDelete: (id: number) => void;
    handleTaskEdit: (task: TaskProps) => void; 
}

const StatusBox: React.FC<StatusBoxProps> = ({
    status,
    taskData,
    handleDragDropMovement,
    handleTaskDelete,
    handleTaskEdit 
}) => {
    // eslint-disable-next-line
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item: any) => handleDragDropMovement(item.taskId, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    return (
        <div ref={drop} className="status-box">
            <Typography sx={{pl:'10%', color:'white', fontSize:'28px', fontWeight: 600, py: '4%'}}>{status}</Typography>
            {taskData.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    handleTaskDelete={handleTaskDelete}
                    handleTaskEdit={handleTaskEdit} 
                    handleDragDropMovement={handleDragDropMovement}
                />
            ))}
            {taskData.length === 0 && <p style={{color:'white'}}>No tasks in {status}</p>}
        </div>
    );
};

export default StatusBox;
