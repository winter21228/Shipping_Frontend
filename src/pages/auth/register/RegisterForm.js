import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

import { PATH_AUTH } from "../../../routes/paths";
import { HOST_API_KEY } from "../../../config-global";

export default function RegisterForm({ data, onSaveData }) {
  const [isLoading, setIsLoading] = useState(false);
  const RegisterSchema = Yup.object().shape({
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
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const handleGoogleSignUp = () => {
    window.location.href = `${HOST_API_KEY}/auth/google`;
  };

  const handleCreate = (values) => {
    setIsLoading(true);
    onSaveData({ ...data, email: values.email, password: values.password });
    window.location.hash = "#step=2";
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-12 max-w-screen-xl min-h-[600px] bg-transparent">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center items-start py-8 bg-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-12 mt-2 text-black">
          Start shipping in seconds
        </h2>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className="w-full space-y-4"
        >
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={"pl-10 h-12 text-base"}
            StartIcon={<Mail className="h-6 w-6" />}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={"pl-10 h-12 text-base"}
            StartIcon={<Lock className="h-6 w-6" />}
            error={errors.password}
            autoComplete="password"
          />
          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold bg-sky-500 hover:bg-sky-600 transition rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create your FREE account"}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleSignUp}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-4 mb-2 text-center w-full">
          By creating an account you agree to the{" "}
          <Link to="#" className="underline">
            Terms of Service
          </Link>
        </p>
        <p className="text-sm text-gray-500 text-center w-full">
          Already have an account?{" "}
          <Link to={PATH_AUTH.login} className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
      {/* Right: Info/Image Panel */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-center px-8 py-8 bg-gray-50 border-l">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
          alt="Shipping boxes"
          className="w-48 h-48 mb-6"
        />
        <div className="text-left">
          <h6 className="text-lg font-bold mb-2">
            Access the cheapest shipping rates available
          </h6>
          <ul className="text-base text-gray-700 space-y-2">
            <li>📦 Up to 89% off USPS® rates</li>
            <li>📦 Up to 85% savings on UPS® rates</li>
            <li>🏅 No hidden fees, markup, or hidden costs</li>
            <li>⭐ 4.9 aggregate reviews on Capterra with 990 reviews</li>
          </ul>
          <p className="mt-4 text-sm">
            Have any questions?{" "}
            <Link href="#" className="text-blue-600 underline">
              Live chat now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
