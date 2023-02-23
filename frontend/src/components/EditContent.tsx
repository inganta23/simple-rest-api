import axios from 'axios';
import React, { useState } from 'react';
import { TaskType } from '../pages/Main';

const EditContent = ({ task, setEdit, getTask }: { task: TaskType; setEdit: React.Dispatch<React.SetStateAction<number | undefined>>; getTask: () => Promise<void> }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.put(`/api/task/${task.id}`, {
                valid: true,
                content
            });
            getTask();
            setEdit(undefined);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    return (
        <div className="flex justify-between items-center">
            <input className="border-2 p-2 shadow-sm rounded-md w-[60%] outline-none" placeholder={task.content} type="text" name="edit" value={content} onChange={(e) => setContent(e.target.value)} />
            <div>
                <button className="flex-no-shrink p-2 mr-2 border-2 rounded hover:text-white text-[green] border-[green] hover:bg-[green]" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="flex-no-shrink p-2 border-2 rounded text-[red] border-[red] hover:text-white hover:bg-[red]" onClick={() => setEdit(undefined)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default EditContent;
