import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const login = async () => {
        try {
            await axios.post(`/api/session`, {
                email,
                password
            });
            setEmail('');
            setPassword('');
            navigate('main');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitLogin = (event: React.FormEvent) => {
        event.preventDefault();
        login();
    };
    return (
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">Login</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                        onClick={() => {
                            setEmail('guest@example.com');
                            setPassword('123456');
                        }}
                    >
                        Generate Guest Account
                    </button>
                    <p className="text-sm font-light text-gray-400">
                        Don't have an account yet?{' '}
                        <a
                            className="font-medium hover:underline text-indigo-400 cursor-pointer"
                            onClick={() =>
                                setSearchParams({
                                    menu: 'register'
                                })
                            }
                        >
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
