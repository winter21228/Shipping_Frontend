import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { login } from "../../redux/slices/auth";

import LoginLayout from "../../layouts/LoginLayout";

import { HOST_API_KEY } from "../../config-global";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(12, "Password must be at least 12 characters"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const handleGoogleSignIn = async () => {
    window.location.href = `${HOST_API_KEY}/auth/google`;
  };

  const handleLogin = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(data));
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 mt-2 text-black text-center">
          Ahoy, Captain!
        </h1>
        <form onSubmit={handleSubmit(handleLogin)} className="w-full space-y-4">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={"pl-4 h-12 text-base"}
            StartIcon={<Mail className="h-6 w-6" />}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={"pl-4 h-12 text-base"}
            StartIcon={<Lock className="h-6 w-6" />}
            error={errors.password}
            autoComplete="password"
          />
          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold bg-sky-500 hover:bg-sky-600 transition rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Yarrrr, log me in"}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-14 text-lg font-bold bg-white border border-gray-300 hover:bg-gray-50 transition rounded-lg flex items-center justify-center space-x-2"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-black">Sign in with Google</span>
          </Button>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="staySignedIn"
                className="accent-blue-500 mr-2"
              />
              <label
                htmlFor="staySignedIn"
                className="text-sm font-medium text-black"
              >
                Stay signed in
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
}
