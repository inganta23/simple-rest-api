import axios from 'axios';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditContent from '../components/EditContent';
import TaskContent from '../components/TaskContent';
import infinity from '../assets/infinity.svg';
import spinner from '../assets/spinner.svg';
import wedges from '../assets/wedges.svg';

export interface TaskType {
    content: string;
    id: number;
    userId: number;
    valid: boolean;
}

const Main = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [taskLoading, setTaskLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [user, setUser] = useState();
    const [content, setContent] = useState('');
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState<number>();

    const getUser = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/api/user/me`);
            setUser(data.name);
        } catch (error: any) {
            navigate('/');
        }
        setIsLoading(false);
    };

    const getTask = async () => {
        setTaskLoading(true);
        try {
            const { data } = await axios.get('/api/task');
            setTasks(data);
        } catch (error: any) {
            console.log(error.message);
        }
        setTaskLoading(false);
    };

    const handleLogout = async () => {
        try {
            await axios.delete('/api/session');
            location.reload();
        } catch (error: any) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getUser();
        getTask();
    }, []);

    const submitTodo = async () => {
        setSubmitLoading(true);
        try {
            await axios.post('/api/task', {
                content,
                valid: true
            });
            setContent('');
            getTask();
        } catch (error: any) {
            console.log(error.message);
        }
        setSubmitLoading(false);
    };
    if (isLoading)
        return (
            <div className="w-full flex items-center justify-center bg-teal-lightest font-sans h-screen">
                <img src={infinity} alt="Loading" />
            </div>
        );
    else
        return (
            <div className="w-full flex items-center justify-center font-sans h-screen bg-teal-500 relative">
                <div className="absolute top-10 right-10">
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg shadow-lg">
                    <div className="mb-4">
                        <h1 className="text-gray-900">Todo List - {user}</h1>
                        <div className="flex mt-4">
                            <input
                                name="content"
                                className="outline-none shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                                placeholder="Add Todo"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button className="flex-no-shrink p-2 border-2 rounded text-[teal] border-[teal] hover:text-white hover:bg-[#008080]" onClick={submitTodo}>
                                {submitLoading ? <img src={spinner} alt="Loading" /> : 'Add'}
                            </button>
                        </div>
                    </div>

                    <div>
                        {taskLoading ? (
                            <div className="flex justify-center items-center">
                                <img src={wedges} alt="Loading Task" />
                            </div>
                        ) : (
                            <>
                                {tasks.map((task: TaskType) => (
                                    <div key={task.id}>
                                        {edit === task.id ? <EditContent task={task} setEdit={setEdit} getTask={getTask} /> : <TaskContent task={task} setEdit={setEdit} getTask={getTask} />}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
};

export default Main;
