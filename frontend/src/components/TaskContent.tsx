import axios from 'axios';
import React from 'react';
import { TaskType } from '../pages/Main';

const TaskContent = ({ task, setEdit, getTask }: { task: TaskType; setEdit: React.Dispatch<React.SetStateAction<number | undefined>>; getTask: () => Promise<void> }) => {
    const handleRemove = async () => {
        try {
            await axios.delete(`/api/task/${task.id}`);
            getTask();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDone = async () => {
        try {
            await axios.put(`/api/task/${task.id}`, {
                content: task.content,
                valid: false
            });
            getTask();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUndone = async () => {
        try {
            await axios.put(`/api/task/${task.id}`, {
                content: task.content,
                valid: true
            });
            getTask();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex my-4 items-center">
            <p className={`w-full pl-2 text-grey-darkest ${!task.valid && 'line-through'}`}>{task.content}</p>
            <button className="flex-no-shrink p-2 border-2 rounded hover:text-white text-cyan-800 border-cyan-800 hover:bg-cyan-800" onClick={() => setEdit(task.id)}>
                Edit
            </button>
            {task.valid ? (
                <button className="flex-no-shrink p-2 mx-2 border-2 rounded hover:text-white text-[green] border-[green] hover:bg-[green]" onClick={handleDone}>
                    Done
                </button>
            ) : (
                <button className="flex-no-shrink p-2 mx-2 border-2 rounded hover:text-white text-amber-600 border-amber-600 hover:bg-amber-600" onClick={handleUndone}>
                    Undone
                </button>
            )}
            <button className="flex-no-shrink p-2 border-2 rounded text-[red] border-[red] hover:text-white hover:bg-[red]" onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
};

export default TaskContent;
