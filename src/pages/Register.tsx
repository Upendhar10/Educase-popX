import React, {useState} from "react";
import type {  ChangeEvent, SubmitEvent} from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

interface RegisterForm {
  name: string;
  number: string;
  email: string;
  password: string;
  company: string;
  isAgency: "yes" | "no";
}

interface FormErrors {
  name?: string;
  number?: string;
  email?: string;
  password?: string;
  company?: string;
  isAgency?: string;
}

interface Field {
  label: string;
  name: keyof RegisterForm;
  type: string;
  placeholder: string;
  required: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>({
      name: "",
      number: "",
      email: "",
      password: "",
      company: "",
      isAgency: "yes",
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const {
    name,
    number,
    email,
    password,
    company,
    isAgency,
  } = form;

  const isDisabled =
    !name || !number || !email || !password;

  // Field definitions
  const fields: Field[] = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      label: "Phone Number",
      name: "number",
      type: "tel",
      placeholder: "Enter your phone number",
      required: true,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
    {
      label: "Company Name",
      name: "company",
      type: "text",
      placeholder: "Enter your company name",
      required: false,
    },
  ];

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Phone validation
    if (name === "number") {
      const numbersOnly =
        value.replace(/\D/g, "");

      if (numbersOnly.length > 10)
        return;

      setForm((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name
    if (!name.trim()) {
      newErrors.name =
        "Full name is required";
    } else if (
      name.trim().length < 3
    ) {
      newErrors.name =
        "Full name must be at least 3 characters";
    }

    // Phone
    if (!number) {
      newErrors.number =
        "Phone number is required";
    } else if (
      !/^\d{10}$/.test(number)
    ) {
      newErrors.number =
        "Phone number must be 10 digits";
    }

    // Email
    if (!email) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    // Password
    if (!password) {
      newErrors.password =
        "Password is required";
    } else if (
      password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Agency
    if (
      !["yes", "no"].includes(
        isAgency
      )
    ) {
      newErrors.isAgency =
        "Select an option";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // Submit handler
  const handleSubmit = (
    e: SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    const userData: RegisterForm = {
      name,
      number,
      email,
      password,
      company,
      isAgency,
    };

    // Get existing users
    const existingUsers:
      RegisterForm[] = JSON.parse(
      localStorage.getItem(
        "popxUsers"
      ) || "[]"
    );

    // Add new user
    existingUsers.push(userData);

    // Save
    localStorage.setItem(
      "popxUsers",
      JSON.stringify(
        existingUsers
      )
    );

    toast.success(
      "Account created successfully! 🎉"
    );

    navigate("/account");
  };

  return (
    <div className="flex flex-col gap-2 px-4 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Create your PopX Account
        </h1>

        <p className="text-xs text-gray-500 mt-2">
          Fill in the details below
          to register.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-6 h-full"
      >
        <div className="flex flex-col gap-6">
          {fields.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={
                field.placeholder
              }
              value={
                form[field.name]
              }
              onChange={
                handleChange
              }
              required={
                field.required
              }
              error={
                errors[field.name]
              }
            />
          ))}

          {/* Agency */}
          <div className="text-sm">
            <p className="font-medium mb-1">
              Are you an Agency?{" "}
              <span className="text-red-500">
                *
              </span>
            </p>

            <div className="flex gap-4 accent-violet-500">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={
                    isAgency ===
                    "yes"
                  }
                  onChange={
                    handleChange
                  }
                />
                Yes
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={
                    isAgency ===
                    "no"
                  }
                  onChange={
                    handleChange
                  }
                />
                No
              </label>
            </div>

            {errors.isAgency && (
              <p className="text-xs text-red-500 mt-1">
                {
                  errors.isAgency
                }
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <Button
          type="submit"
          disabled={isDisabled}
        >
          Create Account
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-violet-600 font-semibold hover:underline"
        >
          Login
        </NavLink>
      </p>
    </div>
  );
};

export default Register;