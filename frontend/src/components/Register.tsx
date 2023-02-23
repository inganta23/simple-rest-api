import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Register = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const register = async () => {
        if (password !== confPassword) return alert('password not match');
        try {
            await axios.post(`/api/user`, {
                name,
                email,
                password
            });
            setEmail('');
            setName('');
            setPassword('');
            setConfPassword('');
            setSearchParams({
                menu: 'login'
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitRegister = (event: React.FormEvent) => {
        event.preventDefault();
        register();
    };

    return (
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">Create an account</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitRegister}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                            Your email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="conf-password" className="block mb-2 text-sm font-medium text-white">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="conf-password"
                            id="conf-password"
                            placeholder="••••••••"
                            className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                    >
                        Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 text-gray-400">
                        Already have an account?{' '}
                        <a
                            className="font-medium text-indigo-400 hover:underline text-indigo-400 cursor-pointer"
                            onClick={() =>
                                setSearchParams({
                                    menu: 'login'
                                })
                            }
                        >
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
