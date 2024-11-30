import React from "react";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import useAuth from "@/hooks/useAuth";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    error,
    handleLoginSubmit: onSubmit,
  } = useAuth();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:p-11 p-7 mx-auto">
      <div className="mb-11">
        <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-center text-base font-medium leading-6">
          Let’s start your day with knowledge
        </p>
      </div>
      <div>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-center text-lg font-medium underline my-3">
          {error?.message && error?.details}
        </p>
      )}
      <Link to="/forgot-password" className="flex justify-end mb-2">
        <span className="text-indigo-600 text-right text-base font-normal leading-6 hover:underline">
          Forgot Password?
        </span>
      </Link>
      <button
        type="submit"
        className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-indigo-800 transition-all duration-700 bg-indigo-600 shadow-sm mb-11"
      >
        Login
      </button>
      <Link
        to="/register"
        className="flex justify-center text-gray-900 text-base font-medium leading-6"
      >
        Don’t have an account?
        <span className="text-indigo-600 font-semibold pl-3 hover:underline">
          {" "}
          Sign Up
        </span>
      </Link>
    </form>
  );
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    handleRegisterSubmit: onSubmit,
    errors,
    error,
  } = useAuth();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
        Create Your Account
      </h2>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder="username"
        {...register("username", {
          required: "Username is required",
          minLength: {
            value: 4,
            message: "Username must be at least 4 characters long",
          },
          maxLength: {
            value: 20,
            message: "Username must be at most 20 characters long",
          },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: "Username must contain only letters, numbers, and _",
          },
        })}
      />
      {errors?.username && (
        <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
      )}
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email address",
          },
        })}
      />
      {errors?.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
      )}
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Password must contain at least one letter and one number",
          },
        })}
      />
      {errors?.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
      {error && (
        <p className="text-red-500 text-center text-lg font-medium underline my-3">
          {error?.message && error?.details}
        </p>
      )}
      <button className="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-indigo-800 bg-indigo-600 shadow-sm ">
        Create Account
      </button>
    </form>
  );
};
