import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [menu, setMenu] = useState('');

    useEffect(() => {
        if (!searchParams.get('menu')) {
            setSearchParams({
                menu: 'register'
            });
        }

        setMenu(searchParams.get('menu') as string);
    }, [searchParams]);

    return <div className="flex justify-center items-center h-screen bg-gray-900">{menu === 'register' ? <Register /> : <Login />}</div>;
};

export default Home;
