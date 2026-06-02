import React, { useState } from "react";
import type {ChangeEvent, SubmitEvent} from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

interface User {
  email: string;
  password: string;
  [key: string]: unknown;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const { email, password } = formData;
  const isDisabled = !email || !password;

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation function
  const validate = (): boolean => {
    const newErrors: Errors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    // Get saved users from localStorage
    const savedUsers: User[] = JSON.parse(
      localStorage.getItem("popxUsers") || "[]"
    );

    // Find matching user
    const matchedUser = savedUsers.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(matchedUser)
      );

      toast.success("Login successful 🎉");

      navigate("/account", { replace: true });
    } else if (savedUsers.length === 0) {
      toast.error("No account found. Please sign up first.");
    } else {
      toast.error("Invalid email or password");

      // Reset password only
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  // Common styling classes
  const labelClass = "absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs font-semibold text-violet-600";

  const inputClass = "w-full rounded-md border border-gray-400 p-3 text-sm outline-none focus:border-violet-500";

  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <div className="flex flex-col gap-2 px-4 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Login to your PopX account.
        </h1>

        <p className="text-xs text-gray-500 mt-2">
          Welcome back! Please enter your email and
          password to continue.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-6"
      >
        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className={labelClass}
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoFocus
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`${inputClass} ${
              errors.email
                ? "border-red-500"
                : "border-gray-400"
            }`}
          />

          {errors.email && (
            <p className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label
            htmlFor="password"
            className={labelClass}
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`${inputClass} ${
              errors.password
                ? "border-red-500"
                : "border-gray-400"
            }`}
          />

          {errors.password && (
            <p className={errorClass}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Tip */}
        <p className="text-[10px] text-gray-500 mt-2">
          <strong>NOTE: </strong> You can view your
          saved email and password in your browser. <br /> 
          DevTools → Application → Local Storage → popxUsers
        </p>

        {/* Button */}
        <Button
          type="submit"
          disabled={isDisabled}
        >
          Login
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <NavLink
          to="/register"
          className="text-violet-600 font-semibold hover:underline"
        >
          Register
        </NavLink>
      </p>
    </div>
  );
};

export default Login;