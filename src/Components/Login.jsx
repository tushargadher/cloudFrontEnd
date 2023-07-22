import React, { useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, Link } from "react-router-dom";
const Login = (props) => {
    const host = 'https://cloudbackend.tushargadher25.repl.co';

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    //this function is called when the form is submited
    const handleSubmit = async (e) => {
        toast.info('Please wait a moment...', { autoClose: 2000, icon: "⏳" });
        //page will not reload
        e.preventDefault();
        // API call

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            //save the auth token in localstorage and redirect user
            localStorage.setItem('token', json.authToken);

            //here we want to redirect user to the home so we write /home 
            toast.success('Logged in...Redirecting to home')
            setTimeout(() => {
                navigate("/");
            }, 1000)

        }
        else {
            toast.error("Can't login please try again");
        }

    }
    const onChange = (event) => {

        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    //this function toggle the visibility of password 
    const togglePassvisibility = () => {
        let passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
    document.title = "CloudNotes - Login";
    return (
        <> <ToastContainer
            transition={Slide}
            position="top-center"
            autoClose={3000} />
            <div className="w-5/6 mx-auto bg-slate-200">
                <section className="h-screen ">
                    <div className="px-6 h-full text-gray-800">
                        {/* <h2>Login to continue Cloud Notes</h2> */}
                        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                            {/* login image */}
                            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0" >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                    className="w-full"
                                    alt="Login Label"
                                />
                            </div>
                            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

                                {/* form start here */}
                                <form onSubmit={handleSubmit}>

                                    <div className="mb-6">
                                        <span className="text-xl font-medium">Login to continue</span>
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="email"
                                            className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="email" name="email" value={credentials.email}
                                            placeholder="Email address"
                                            onChange={onChange} required
                                        />
                                    </div>

                                    {/* password */}
                                    <div className="mb-6">
                                        <input
                                            type="password"
                                            className="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            id="password" name="password" value={credentials.password}
                                            placeholder="Password"
                                            onChange={onChange} required

                                        />
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <div className="form-group form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                id="showpass"
                                                onClick={togglePassvisibility}
                                            />
                                            <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                            >Show Password</label>
                                        </div>

                                    </div>

                                    <div className="text-center lg:text-left">
                                        <button
                                            type="submit"
                                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        >
                                            Login
                                        </button>
                                        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                            Don't have an account?
                                            <Link
                                                to="/signup"
                                                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out mx-1"
                                            >Register</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Login;