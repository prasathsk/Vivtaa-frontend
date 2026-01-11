import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../Schema/auth.schema";
import type { LoginFromValidation } from "../Interface/login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseLocalStorage from "../@hooks/useLocalStorage";

const Login = () => {
    const navigate = useNavigate();
    const { setLocalstorage } = UseLocalStorage();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFromValidation>({
        resolver: yupResolver(loginSchema),
        mode: "onSubmit",
    });


    const onSubmit = async (data: LoginFromValidation) => {
        console.log('payload', data);
        try {
            await axios.post(`http://localhost:3000/auth/api/login`, data)
                .then((res) => {
                    if (res) {
                        console.log('res', res?.data?.accessToken);
                        setLocalstorage('access-token', res?.data?.accessToken);
                        setLocalstorage('refresh-token', res?.data?.refreshToken);
                        alert('user login successfully');
                        setTimeout(() => {
                            navigate('/product-list');
                        }, 500);
                    }
                })
        } catch (error) {
            console.error(error);
            alert(`login:${error}`)
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} action="#" method="POST" className="space-y-6">
                    {/* email */}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm">
                                    {errors.email.message}
                                </p>
                            )}

                        </div>
                    </div>
                    {/* password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-100"
                            >
                                Password
                            </label>
                        </div>

                        <div className="relative mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                {...register("password")}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                            {errors.password && <p className="text-red-400 text-sm">
                                {errors.password.message}
                            </p>
                            }

                            {/* 👁 Eye Icon */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    /* Eye Off */
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.195.21-2.34.6-3.405M6.75 6.75A9.953 9.953 0 0112 5c5.523 0 10 4.477 10 10a9.96 9.96 0 01-4.293 8.205M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                ) : (
                                    /* Eye */
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <p className="text-sm text-gray-300 text-center">
                            New user?{" "}
                            <span
                                onClick={() => navigate("/register")}
                                className="text-indigo-400 cursor-pointer hover:underline"
                            >
                                Register
                            </span>
                        </p>
                    </div>

                    <div>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Log-in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;